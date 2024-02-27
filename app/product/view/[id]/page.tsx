'use client';

import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);

  const { id } = useParams();

  const getProduct = async () => {
    await axios.get('/product/api/' + id).then((res) => {
      console.log(res);
      setProduct(res.data[0]);
    });
  };

  useEffect(() => {
    getProduct();
    setIsClient(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isClient && (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Product View</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <h1>{product?.name}</h1>
            <p>Buy Price: {product?.buy_price}</p>
            <p>Sell Price: {product?.sell_price}</p>
            <IonItem lines='none'>
              <h2>{product?.name}</h2>
            </IonItem>
            <IonCard>
              <IonCardContent>
                <p>Buy Price: {product?.buy_price}</p>
                <p>Sell Price: {product?.sell_price}</p>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
}
