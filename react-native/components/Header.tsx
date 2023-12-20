import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import getGreeting from '../utils/greeting'
import { useStore } from '../zustand/todoStore'
import { useDialog } from './AddCategoryDialog'
const Header = ({ navigation }) => {
    const username = useStore(state => state.username)
    const setShowAddCategoryDialog = useDialog(state => state.setShow)
    return (
        <View className={`bg-orange-400 w-full space-y-1 p-4 flex-row items-center justify-between ${Platform.OS == 'android' ? 'pt-4' : 'pt-12'}`}>
            <View className=''>
                <Text className='font-bold text-xl text-gray-50'>FarisTM</Text>
                <Text className='text-xs text-amber-900 -text-orange-900'>{getGreeting()} <Text className='font-bold'>{username}</Text></Text>
            </View>
            <TouchableOpacity onPress={() => setShowAddCategoryDialog(true)}>
                <Icon name='plus' size={24} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}
export default Header