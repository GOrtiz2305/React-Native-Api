import { Layout, List } from "@ui-kitten/components"
import { Product } from "../../../domain/entities/product"
import { useState } from "react";
import { RefreshControl } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {

  const queryClient = useQueryClient();
  const [IsRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    // sleep 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
    setIsRefreshing(false);
  }

  const renderItem = ({ item }: any): React.ReactElement => (
    <ProductCard product={item} />
  );

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}

      refreshControl={
        <RefreshControl
          refreshing={IsRefreshing}
          onRefresh={onPullToRefresh}
        />
      }

    />
  )
}