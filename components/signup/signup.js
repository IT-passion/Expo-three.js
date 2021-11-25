import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from 'react-native-picker-select';

const uploadImage = async () => {
  let res = await DocumentPicker.getDocumentAsync({});
}

const container = {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
};

const details = {
  marginTop: 40,
  alignItems: 'center',
};

const buttons = {
  marginTop: 20,
  alignItems: "center",
};

const link = {
  alignItems: 'center',
  marginTop: 20,
};

const input = {
  height: 35,
  width: 250,
  margin: 15,
  borderWidth: 1,
  padding: 5,
  borderRadius: 5
};

const buttonStyle = {
  backgroundColor: '#307ecc',
  borderWidth: 0,
  width: 250,
  color: '#FFFFFF',
  borderColor: '#307ecc',
  height: 40,
  borderRadius: 10,
  margin: 15
};

const buttonTextStyle = {
  color: '#FFFFFF',
  padding: 10,
  fontSize: 16,
  textAlign: 'left'
};

const upload = {
  width: 280,
  height: 84
};

const select = {
  margin: 15,
  borderRadius: 10,
  width: 250,
  height: 40,
};

const addBtn = {
  height: "100%",
  width: 250,
  margin: 15,
  padding: 5,
  borderRadius: 5
};
const Public = {
  height: 35,
  width: 180,
  margin: 5,
  borderWidth: 1,
  padding: 5,
  borderRadius: 5,
};
const deleteButton = {
  width: 50,
  height: 35,
};
const role = {
  display: "flex",
  alignItems: 'center'
}

export default function Signup({navigation}) {

  const [email, onChangeEmail] = useState('');
  const [username, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [public_id, onChangePublicID] = useState('');
  const [organisation_public_id, onChangeOrganisation] = useState('');
  const [favAdmin, setFavAdmin] = useState('');
  const [favActive, setFavActive] = useState('');
  const [addItems, setAddItems] = useState([]);
  const [arrayItems, setArrayItems] = useState('');
  const [itemID, setItemID] = useState(0);

  const [singleFile, setSingleFile] = useState('');
  const res = '';
  const rolePublicIds = '';

  const goLoginPage = () => {
    setSingleFile(res);
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('name', 'Image Upload');
    data.append('file_attachment', fileToUpload);
    inputValue_arr.map((item)=>{
      rolePublicIds = rolePublicIds + "role_public_ids=" + item + "&";
    })

    return fetch(`https://bim.constology.com/api/user/?email=${email}&username=${username}&password=${password}&public_id=${public_id}
    &public_id=${public_id}&admin=${favAdmin}&organisation_public_id=${organisation_public_id}&${rolePublicIds}is_active=${favActive}`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      
    })
    .then((response) => {
      console.log(response);
      if(response.status == 201){
        navigation.push("Signin");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const goBackLoginPage = () => {
    navigation.push("Signin");
  }

  let arr = new Array();
  let new_arr = new Array();
  let remove_arr = new Array();
  let inputValue_arr = new Array();
  const addItem = () => {
    arr = addItems;
    arr.push(itemID);
    setItemID(itemID+1);
    setAddItems(arr);
    remove_arr = arr;
    setArrayItems(
      addItems.map((item, index)=>{
        return <View key={item} style={role, {flexFlow: "row"}}><TextInput style={Public, {float: "left"}} onChange={(e) => onChangeText(e,item)}></TextInput><TouchableOpacity style={deleteButton, {float: "left"}}><Button title="-" onPress={()=>removeItem(item)}></Button></TouchableOpacity></View>
      })
    );
  }
  const removeItem = (index) => {
    remove_arr.map((item) => {
      if(item != index) {
        new_arr.push(item);
      }
    })
    setAddItems(new_arr);
    remove_arr = new_arr;
    console.log(new_arr, remove_arr);
    setArrayItems(
      new_arr.map((item, index)=>{
        return <View key={item} style={role, {flexFlow: "row"}}><TextInput style={Public, {float: "left"}} value={inputValue_arr[item]} onChange={(e) => onChangeText(e,item)}></TextInput><TouchableOpacity style={deleteButton, {float: "left"}}><Button title="-" onPress={()=>removeItem(item)}></Button></TouchableOpacity></View>
      })
    );
    new_arr = new Array();
  }
  const onChangeText = (e, item) => {
    inputValue_arr[item] = e.target.value;
  }
  
  const items = [
    {
        label: 'True',
        value: 'true',
    },
    {
        label: 'False',
        value: 'false',
    },
  ];
  const actives = [
    {
        label: 'True',
        value: 'true',
    },
    {
        label: 'False',
        value: 'false',
    },
  ];

  return (
    <View style={{padding: 50}}>
      <View style={container}>
        <Text style={{fontSize: "30px"}}>Sign Up</Text>
      </View>
      <View style={details}>
        <View>
          <Text >Email : </Text>
          <TextInput style={input} placeholder="email" value={email} onChangeText={text => onChangeEmail(text)}></TextInput>
        </View>
        <View>
          <Text>Username : </Text>
          <TextInput style={input} placeholder="username" value={username} onChangeText={text => onChangeName(text)}></TextInput>
        </View>
        <View>
          <Text>Password : </Text>
          <TextInput style={input} secureTextEntry placeholder="password" value={password} onChangeText={text => onChangePassword(text)} ></TextInput>
        </View>
        <View>
          <Text>Public_id : </Text>
          <TextInput style={input} placeholder="public_id" value={public_id} onChangeText={text => onChangePublicID(text)}></TextInput>
        </View>
        <View style={upload}>
          <Text>Image : </Text>
          <TouchableOpacity style={buttonStyle} activeOpacity={0.5} onPress={uploadImage}>
            <Text style={buttonTextStyle}>Choose File</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Admin : </Text>
          <TouchableOpacity style={select}>
            <RNPickerSelect
              placeholder={{
                  label: ' ',
                  value: 'Please Select',
              }}
              items={items}
              onValueChange={(value) => {
                  setFavAdmin(value);
              }}
              value={favAdmin}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>Organisation_public_id : </Text>
          <TextInput style={input} placeholder="organisation_public_id" value={organisation_public_id} onChangeText={text => onChangeOrganisation(text)} ></TextInput>
        </View>
        <View>
          <Text>Role_public_ids : </Text>
          <TouchableOpacity style={addBtn}>
            {arrayItems}
            <Button title="Add item" onPress={addItem}></Button>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Is_active : </Text>
          <TouchableOpacity style={select}>
            <RNPickerSelect
              placeholder={{
                  label: ' ',
                  value: '',
              }}
              items={actives}
              onValueChange={(value) => {
                  setFavActive(value);
              }}
              value={favActive}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={buttons}>
        <TouchableOpacity style={{ width: 300 }}>
          <Button title="Sign Up" onPress={goLoginPage}></Button>
        </TouchableOpacity>
      </View>
      <View style={link}>
        <Text>Already have an account?</Text>
        <Text style={{color: "skyblue"}} onPress={goBackLoginPage}>Sign In</Text>
      </View>
    </View>
  );
}