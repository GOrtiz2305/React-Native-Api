import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/MyIcon"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "../../../domain/entities/user"
import { updateCreateUser } from "../../../actions/users/update-create-users"
import { Formik } from "formik"

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {

  const queryClient = useQueryClient();
  const { height } = useWindowDimensions();

  const mutation = useMutation({
    mutationFn: (data: User) => updateCreateUser({ ...data }),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'infinite'] });
    }
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values: any) => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <Layout style={{ flex: 1 }}>
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
                  accessoryLeft={<MyIcon name='person-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('names')}
                />
                <Input
                  id="last_names"
                  placeholder="Apellidos"
                  autoCapitalize='words'
                  accessoryLeft={<MyIcon name='person-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('last_names')}
                />
                <Input
                  id="phone"
                  placeholder="Teléfono"
                  keyboardType='phone-pad'
                  accessoryLeft={<MyIcon name='phone-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('phone')}
                />
                <Input
                  id="address"
                  placeholder="Dirección"
                  autoCapitalize='words'
                  accessoryLeft={<MyIcon name='pin-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('address')}
                />
                <Input
                  id="nit"
                  placeholder="NIT"
                  keyboardType='number-pad'
                  style={{ marginBottom: 10 }}
                  accessoryLeft={<MyIcon name='hash-outline' />}
                  onChangeText={handleChange('nit')}
                />
                <Input
                  id="email"
                  placeholder="Correo electrónico"
                  keyboardType='email-address'
                  autoCapitalize='none'
                  accessoryLeft={<MyIcon name='email-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('email')}
                />
                <Input
                  id="password"
                  placeholder="Contraseña"
                  autoCapitalize='none'
                  secureTextEntry
                  accessoryLeft={<MyIcon name='lock-outline' />}
                  style={{ marginBottom: 10 }}
                  onChangeText={handleChange('password')}
                />
              </Layout>
              <Layout style={{ height: 20 }} />
              <Layout>
                <Button
                  accessoryRight={<MyIcon name='arrow-forward-outline' white />}
                  onPress={() => handleSubmit()}
                >
                  Registrarse
                </Button>
              </Layout>
              <Layout style={{ height: 50 }} />
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
              {/* <Text> {JSON.stringify(values, null, 2)} </Text> */}
            </ScrollView>
          </Layout>
        )
      }
    </Formik>
  )
}
