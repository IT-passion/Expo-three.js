import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Signin from '../my-project/components/signin/signin';
import Signup from '../my-project/components/signup/signup';
import Model from '../my-project/components/model/model';

const Stack = createStackNavigator();
const Routes = () => {
return (
<Stack.Navigator>
   <Stack.Screen name="Signin" component={Signin} />
   <Stack.Screen name="Signup" component={Signup} />
   <Stack.Screen name="Model" component={Model} />
</Stack.Navigator>
)
}
export default Routes