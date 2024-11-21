import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/MyIcon"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex:1}}>
      <ScrollView style={{ marginHorizontal: 30 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1">Registro</Text>
          <Text category="p2">Por favor, registrese para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            id="name"
            placeholder="Nombre"
            autoCapitalize='words'
            accessoryLeft={ <MyIcon name='person-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id="last_names"
            placeholder="Apellidos"
            autoCapitalize='words'
            accessoryLeft={ <MyIcon name='person-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id="phone"
            placeholder="Teléfono"
            keyboardType='phone-pad'
            accessoryLeft={ <MyIcon name='phone-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id="address"
            placeholder="Dirección"
            autoCapitalize='words'
            accessoryLeft={ <MyIcon name='pin-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id="nit"
            placeholder="NIT"
            keyboardType='number-pad'
            style={{ marginBottom: 10 }}
          />
          <Input
            id="email"
            placeholder="Correo electrónico"
            keyboardType='email-address'
            autoCapitalize='none'
            accessoryLeft={ <MyIcon name='email-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id="password"
            placeholder="Contraseña"
            autoCapitalize='none'
            secureTextEntry
            accessoryLeft={ <MyIcon name='lock-outline' /> }
            style={{ marginBottom: 10 }}
          />
        </Layout>
        <Layout style={{ height: 20 }}/>
        <Layout>
          <Button
            accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
            onPress={() => {}}
          >
            Registrarse
          </Button>
        </Layout>
        <Layout style={{ height: 50 }}/>
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>¿Ya tienes cuenta?</Text>
          <Text
            status='primary'
            category="s1"
            onPress={() => navigation.goBack()}
          >
            {' '}
            Ingresar
            {' '}
          </Text>
        </Layout>
        </ScrollView>
    </Layout>
  )
}
