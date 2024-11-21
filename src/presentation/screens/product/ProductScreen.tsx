import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { Button, IndexPath, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { useRef } from 'react';
import { Image, ScrollView } from 'react-native';
import { Brand, Product, Presentation } from '../../../domain/entities/product';
import { getBrands, getPresentations, getProductById } from '../../../actions/products/get-prouct-by-id';
import { MyIcon } from '../../components/MyIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '../../../actions/products/update-create-product';
import React from 'react';


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {

  const productIdRef = useRef(route.params.productId);
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  })

  const { data: presentations = [] } = useQuery({
    queryKey: ['presentations'],
    queryFn: () => getPresentations(),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands(),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: Number(productIdRef.current) }),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id.toString();
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id.toString()] });
    }
  })

  if (!product) {
    return (<MainLayout title="Cargando..." />)
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={(values: any) => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={values.product_name}
            subTitle={'Precio: $' + values.price}
          >
            <ScrollView style={{ flex: 1 }}>
              <Layout>
                <Image
                  source={require('../../../assets/Miel.png')}
                  style={{ width: '100%', height: 200 }}
                />
              </Layout>

              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label="Nombre"
                  value={values.product_name}
                  style={{ marginVertical: 5 }}
                  onChangeText={handleChange('product_name')}
                />
                <Input
                  label="Precio"
                  value={values.price.toString()}
                  style={{ marginVertical: 5 }}
                  onChangeText={handleChange('price')}
                />
                <Input
                  label="Descripcion"
                  multiline
                  numberOfLines={7}
                  value={values.product_description}
                  style={{ marginVertical: 5 }}
                  onChangeText={handleChange('product_description')}
                />
                <Input
                  label="Stock"
                  value={values.stock.toString()}
                  style={{ marginVertical: 5 }}
                  onChangeText={handleChange('stock')}
                />
                <Select
                  label="Presentación"
                  value={
                    presentations.find((item) => item.id === values.presentation?.id)?.presentation_name || presentations[0]?.presentation_name || ''
                  }
                  onSelect={(index) => {
                    const selectedPresentation = presentations[(index as IndexPath)?.row] || presentations[0];
                    setFieldValue('presentation_id', selectedPresentation.id);
                    setFieldValue('presentation', { id: selectedPresentation.id, presentation_name: selectedPresentation.presentation_name });
                  }}
                  style={{ marginVertical: 5 }}
                >
                  {presentations.map((item) => (
                    <SelectItem key={item.id} title={item.presentation_name} />
                  ))}
                </Select>
                <Select
                  label="Marca"
                  value={
                    brands.find((item) => item.id === values.brand?.id)?.brand_name || brands[0]?.brand_name || ''
                  }
                  onSelect={(index) => {
                    const selectedBrand = brands[(index as IndexPath)?.row] || brands[0];
                    setFieldValue('brand_id', selectedBrand.id);
                    setFieldValue('brand', { id: selectedBrand.id, brand_name: selectedBrand.brand_name });
                  }}
                  style={{ marginVertical: 5 }}
                >
                  {brands.map((item) => (
                    <SelectItem key={item.id} title={item.brand_name} />
                  ))}
                </Select>
              </Layout>
              <Button
                accessoryLeft={<MyIcon name="save-outline" white />}
                onPress={() => handleSubmit()}
                style={{ margin: 15 }}
              >
                Guardar
              </Button>

              {/* <Text> {JSON.stringify(values, null, 2)} </Text> */}
              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>

  )
}
