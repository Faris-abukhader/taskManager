import React, { useState } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import { create } from 'zustand'
import { Api } from '../utils/axois'
import { useStore } from '../zustand/todoStore'
import { Category } from '../utils/type'
export default function AddCategoryDialog() {
    const { secret, addCategory } = useStore(state => state)
    const { show, setShow } = useDialog(state => state)
    const [category, setCategory] = useState('')

    const handleClick = () => {
        if (category.length < 2) return
        setShow(false)
        Api(secret).post<Category>('/category', { title: category })
            .then((res) => {
                console.log(res.data)
                addCategory(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setCategory('')
            })
    }
    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className='w-full min-h-screen flex items-center justify-center px-4'>
                <View className='w-full bg-gray-600 p-4 rounded-md space-y-2'>
                    <Text className='text-gray-300 text-lg font-bold text-center'>Add new category</Text>
                    <TextInput value={category} onChangeText={(val) => setCategory(val)} className='border border-zinc-500 rounded-md p-2' />
                    <TouchableOpacity disabled={category && category.length < 2} onPress={(handleClick)} className={`${category && category.length < 2 ? 'bg-orange-200' : 'bg-orange-400'} w-full  p-2 rounded-md`}>
                        <Text className={`${category && category.length < 2 ? 'text-gray-900' : 'text-gray-50'} text-center`}>confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={category && category.length < 2} onPress={() => setShow(false)} className={`bg-gray-400 w-full  p-2 rounded-md`}>
                        <Text className='text-center' >cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

type Dialog = {
    show: boolean,
    setShow: (show: boolean) => void
}

export const useDialog = create<Dialog>((set, get) => ({
    show: false,
    setShow(show) {
        set({ show })
    },
}))
