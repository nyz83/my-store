'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonItem,
  IonButtons,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export default function ProductPage() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get('/product/api').then((res) => {
      setProducts(res.data);
    });
  };

  const handleDelete = async (item: any) => {
    await axios.delete('/product/api/' + item?.id).then((res) => {
      console.log('Delete Response', res);
      getProducts();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Product List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {products.map((item: any) => (
          <IonItem key={item.id}>
            <p>{item.name}</p>
            <IonToolbar>
              <IonButtons slot='end'>
                <IonButton
                  className='px-4 py-2 '
                  onClick={() => handleDelete(item)}>
                  Delete
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
}
