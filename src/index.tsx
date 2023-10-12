import React, {useState} from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import WelcomeImage from './assets/images/welcome_image.png';
import { useNavigation } from '@react-navigation/native';
import { api } from 'http-module';
import {Modal, ActivityIndicator} from 'react-native';


type IProps = {
    isLoading: boolean;
    backgroundColor: string;
    loadingColor: string;
};

const ModalContainer = styled.View`
flex: 1;
align-item: center;
justify-content: center;
`;


const ActivityIndicatorWrapper = styled.View<{backgroundColor: string}>`
 background-color: ${props => props.backgroundColor};
 padding: 20px;
 border-radius: 10px;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const Loading = (props: IProps) => (
    <Modal transparent={true} animationType="fade" visible={props.isLoading}>
        <ModalContainer>
            <ActivityIndicatorWrapper background-color={props.backgroundColor}>
                <ActivityIndicator animating={props.isLoading} color={props.loadingColor} size="large" />
            </ActivityIndicatorWrapper>
        </ModalContainer>
    </Modal>
);

export default Loading;

export interface IUserResponse {
    name: string;
    email: string;
};

export interface ILoginUser {
    email: string;
    password: string;
};

export interface ISignUpUser {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export const fetchUsers = async(): Promise<IUserResponse> => {
    const response = await api.get<IUserResponse>('/read-user');
    return response.data;
};

export const postLogin = async(user: ILoginUser): Promise<Number> => {
    const response = await api.post('/login-user', user);
    return response.status;
};

type ButtonProps = {
  color: string;
};

const Image = styled.Image`
  width: 320px;
  height: 240px;
  align-self: center;
  margin-top: 16px;
`;

const InputContainer = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

const InputContainerNew = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  color: #fff;
`;

const Input = styled.TextInput`
  height: 60px;
  padding: 8px;
  background-color: #1a182b;
  margin-bottom: 8px;
  color: #fff;
  border-radius: 16px;
`;

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.color};
  height: 50px;
  border-radius: 16px;
  justify-content: center;
  margin-top: 32px;
`;

const Label = styled.Text`
  color: black;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const LabelNew = styled.Text`
  color: red;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const FooterContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

 const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateFields = (): boolean => {
    if (!email || !password) {
      Alert.alert('Por favor, preencha todos os campos');
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const user: ILoginUser = {
        email,
        password,
      };
      await postLogin(user);
      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('Dados não encontrados. Confira seu login ou senha!');
    } finally {
      setIsLoading(false);
    }
    // setIsLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <StatusBar barStyle={'light-content'} />
      <Image source={WelcomeImage} />
      <InputContainer>
        <Input
          placeholder="e-mail"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          onChangeText={e => setEmail(e)}
          value={email}
        />
        <Input
          placeholder="senha"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={p => setPassword(p)}
          value={password}
        />
        <Button color="#00ff7f" activeOpacity={0.7} onPress={loginUser}>
          <Label>Login</Label>
        </Button>
        {isLoading && (
          <Loading backgroundColor="#FFF" isLoading loadingColor="red" />
        )}
      </InputContainer>
      <InputContainerNew>

      <LabelNew>OU</LabelNew>
  
      </InputContainerNew>
      <FooterContainer>
        <Button color="white" activeOpacity={0.7} onPress={() => navigation.navigate('SignUp')}>
          <Label>CADASTRE-SE</Label>
        </Button>
      </FooterContainer>
    </ScrollView>
  );
};

export {Login}
