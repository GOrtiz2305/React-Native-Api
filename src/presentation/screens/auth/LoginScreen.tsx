import { Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react'
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {

  const {login} = useAuthStore();

  const [isPosting, setIsPosting] = React.useState(false);
  const [form, setForm] = React.useState({
    email: '',
    password: ''
  });

  const { height } = useWindowDimensions();

  const onLogin = async() => {
    if ( form.email.length === 0 || form.password.length === 0){
      return;
    }
    setIsPosting(true);

    const wasSuccessfull = await login(form.email, form.password);
    setIsPosting(false);

    if ( wasSuccessfull ) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <Layout style={{ flex: 1}}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            id='email'
            placeholder="Correo electrónico"
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={ (email) => setForm({ ...form, email }) }
            accessoryLeft={ <MyIcon name='email-outline' /> }
            style={{ marginBottom: 10 }}
          />
          <Input
            id='password'
            placeholder="Contraseña"
            autoCapitalize='none'
            secureTextEntry
            accessoryLeft={ <MyIcon name='lock-outline' /> }
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={ (password) => setForm({ ...form, password }) }
          />
        </Layout>
        <Layout style={{ height: 20 }}/>
          <Layout>
            <Button
              disabled={ isPosting }
              accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
              onPress={ onLogin }
            >
              Ingresar
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
            <Text category="p2">¿No tienes cuenta?</Text>
            <Text
              status='primary'
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {' '}
              Regístrate
              {' '}
            </Text>
          </Layout>
      </ScrollView>
    </Layout>
  )
}
