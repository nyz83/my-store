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

export default function Page() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);

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

  const handleView = (item: any) => {
    window.location.href = '/product/view/' + item?.id;
  };

  const handleEdit = (item: any) => {
    window.location.href = '/product/edit/' + item?.id;
  };

  useEffect(() => {
    getProducts();
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
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
                      onClick={() => handleView(item)}
                      fill='outline'>
                      View
                    </IonButton>
                    <IonButton
                      onClick={() => handleEdit(item)}
                      fill='outline'>
                      Edit
                    </IonButton>
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
      )}
    </>
  );
}
