import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicatorComponent } from 'react-native'
import { useEffect } from 'react'
import { useStore } from '../zustand/todoStore';
import { Api } from '../utils/axois';
import { SignInResponse } from '../utils/type';

const GettingStart = ({ navigation }) => {
    const { isInitialized, username, setUsername, saveCredentials, setSecret, secret } = useStore(state => state);

    useEffect(() => {
        if (isInitialized && username != undefined) {
            navigation.navigate('home')
        }
    }, [isInitialized])

    const handleClick = () => {
        Api(secret).post<SignInResponse>('/auth/signIn', { name: username })
            .then(res => {
                console.log(res.data.secret_id)
                setSecret(res.data.secret_id)
                saveCredentials()
                navigation.navigate('home')
            })
            .catch(err => console.log(err))
    }

    if (!isInitialized) {
        return <ActivityIndicatorComponent />
    }

    return (
        <View className='w-full min-h-screen flex items-center justify-center bg-white'>
            <View className='w-full p-5 pt-20 space-y-5 text-center items-center h-fit'>
                <Text className='text-3xl font-bold text-center'>Welcome to <Text className='text-orange-400'>Faris</Text> TaskManager</Text>
                <Image width={120} height={120} className='w-4/5 h-1/2' source={require('../assets/gettingStart.png')} />
                <TextInput value={username ?? ''} onChangeText={(val) => setUsername(val)} placeholder='enter your name here...' className='border w-full border-gray-200 rounded-md p-2' />
                <TouchableOpacity disabled={username && username.length < 4} onPress={handleClick} className={`${username && username.length < 4 || username == '' ? 'bg-orange-200' : 'bg-orange-400'} w-full  p-2 rounded-md`}>
                    <Text className='text-gray-50 text-center'>confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GettingStart