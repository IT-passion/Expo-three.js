import React, { useCallback, useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, Linking } from 'react-native';

const container = {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  marginTop: 150,
};

const inputs = {
  marginTop: 40,
  alignItems: 'center',
};

const input = {
  height: 35,
  width: 300,
  margin: 15,
  borderWidth: 1,
  padding: 5,
  borderRadius: 5
}

const buttons = {
  marginTop: 20,
  alignItems: "center",
}

const link = {
  alignItems: 'center',
  marginTop: 20,
}

export default function Signin({navigation}) {
  const login = () => {
    return fetch('https://bim.constology.com/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
      console.log(response);
      if(response.status == 200){
        navigation.push("Model");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const goSignupPage = () => {
    navigation.push("Signup");
  }

  const [email, onChangeText] = useState('');
  const [password, onChangePass] = useState('');

  return (
    <View>
      <View style={container}>
        <Text style={{fontSize: "30px"}}>Log In with Project</Text>
      </View>
      <View style={inputs}>
        <TextInput style={input} placeholder="Email" value={email} onChangeText={text => onChangeText(text)}></TextInput>
        <TextInput style={input} secureTextEntry placeholder="Password" value={password} onChangeText={text => onChangePass(text)} ></TextInput>
      </View>
      <View style={buttons}>
      <TouchableOpacity style={{ width: 300 }}>
        <Button title="Sign In" onPress={login}></Button>
        </TouchableOpacity>
      </View>
      <View style={link}>
        <Text>Don't have an account?</Text>
        <Text style={{color: "skyblue"}} onPress={goSignupPage}>Sign Up</Text>
      </View>
    </View>
  );
}