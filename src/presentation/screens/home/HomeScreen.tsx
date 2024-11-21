import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductsList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { FAB } from '../../components/ui/FAB';

export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { logout } = useAuthStore();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    // la primera pagina sera la 0
    initialPageParam: 1,
    // funcion asincrona que recibe los parametros de pagina
    queryFn: async (params) => {
      console.log({ params });
      // peticion que regresa los productos por pagina
      return await getProductsByPage(params.pageParam);
    },
    // como obtendremos la siguiente pagina
    getNextPageParam: (lastPage, allPages) => allPages.length,
  })

  return (
    <>
      <MainLayout
        title="Honey Shop"
        subTitle="Bienvenido a la tienda"
        rightAction={() => { }}
        rightActionIcon="plus-outline"
      >
        {
          isLoading
            ? (<FullScreenLoader />)
            : <ProductList
              products={data?.pages.flat() ?? []}
              fetchNextPage={fetchNextPage}
            />
        }
      </MainLayout>

      <FAB
        iconName='plus-outline'
        onPress={() => navigation.navigate('ProductScreen', { productId: 'new' })}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
      />
    </>
  )
}
