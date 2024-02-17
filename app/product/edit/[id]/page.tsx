'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonFooter,
} from '@ionic/react';

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  const getProduct = () => {
    axios.get('/product/api/' + id).then((res) => {
      console.log('product data', res.data);
      setProduct(res.data[0]);
    });
  };

  const nameRef = useRef<HTMLIonInputElement>(null);
  const sellPriceRef = useRef<HTMLIonInputElement>(null);
  const buyPriceRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value?.toString() || '');
    formData.append('buyPrice', buyPriceRef.current?.value?.toString() || '');
    formData.append('sellPrice', sellPriceRef.current?.value?.toString() || '');
    formData.append('id', id.toString());

    await axios.patch('/product/api', formData).then((res) => {
      console.log('product update response', res.data);
      window.location.href = '/product';
    });
  };

  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Page</IonTitle>
            <IonButtons slot='end'>
              <IonButton
                expand='block'
                onClick={() => handleSave()}>Save</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              value={product?.name}
              placeholder='Name'
              ref={nameRef}
              labelPlacement='fixed'
              label='Name'
            />
          </IonItem>
          <IonItem>
            <IonInput
              value={product?.buy_price}
              placeholder='Buy Price'
              ref={buyPriceRef}
              labelPlacement='floating'
              label='Buy Price'
            />
          </IonItem>
          <IonItem>
            <IonInput
              value={product?.sell_price}
              placeholder='Sell Price'
              ref={sellPriceRef}
              labelPlacement='stacked'
              label='Sell Price'
            />
          </IonItem>
        </IonContent>
        <IonFooter></IonFooter>
      </IonPage>
    </div>
  );
}
