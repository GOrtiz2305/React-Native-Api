import { Card, Text } from "@ui-kitten/components"
import { Product } from "../../../domain/entities/product"
import { Image } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigator"
import { FadeInImage } from "../ui/FadeInImage"

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card
      style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 3 }}
      onPress={() => navigation.navigate('ProductScreen', { productId: product.id.toString() })}
    >
      {
        (product.image === null || product.image === undefined)
          ? (
            <Image
              source={require('../../../assets/Miel.png')}
              style={{ width: '100%', height: 200 }}
            />
          )
          : (
            <FadeInImage
              uri={product.image[0]}
              style={{ flex: 1, width: '100%', height: 200 }}
            />
          )
      }

      <Text
        numberOfLines={2}
        style={{ textAlign: 'center' }}
      >{product.product_name}</Text>
    </Card>
  )
}