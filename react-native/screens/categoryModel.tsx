import { View, Text, SafeAreaView, Platform, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../zustand/todoStore';
import Checkbox from 'expo-checkbox';
import { Api } from '../utils/axois';
import { Todo } from '../utils/type';

const CategoryModel = () => {
    const { currentCategory, createTodo, secret, deleteTodo } = useStore(state => state)
    const [showAdd, setShowAdd] = useState(false)
    const [newTodo, setNewTodo] = useState({ content: '', isDone: false, prioerity: 1 })
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: currentCategory.title,
        });
    }, [currentCategory])

    const handlePrioerity = (newValue: string) => {
        const value = +newValue
        if (value < 0 || value > 5) return

        setNewTodo((prevs) => ({ ...prevs, prioerity: value > 10 ? value / 10 : value }))
    }

    const handleCreatingNewTodo = () => {
        Api(secret).post<Todo>('/todo', {
            categoryId: currentCategory.id,
            ...newTodo
        })
            .then(res => {
                createTodo(currentCategory.id, res.data)
            }).finally(() => {
                setNewTodo({ content: '', isDone: false, prioerity: 1 })
                setShowAdd(false)
            })
    }

    const handleDeleteTodo = (id: string, title: string) => {

        Alert.alert('Delete Todo', `Are you sure you want to delete ${title} ?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm', onPress: () => Api(secret).delete(`/todo/${id}`)
                    .then(() => {
                        deleteTodo(currentCategory.id, id)
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        setNewTodo({ content: '', isDone: false, prioerity: 1 })
                    })
            },
        ]);
    }

    const contentRendering = () => {
        if (currentCategory.todoList.length == 0) {
            return <View className='w-full h-screen bg-white flex items-center justify-start  overflow-hidden'>
                <View className='w-2/3 mt-10'>
                    <Image className='w-2/3 h-64 self-center' source={require('../assets/empty-box.png')} />
                    <Text className='text-center'>You don't have any task in {currentCategory.title} category.</Text>
                </View>
            </View>
        } else {
            return <ScrollView className='pt-8'>
                {currentCategory.todoList.map(item => <View key={item.id} className='w-full flex-row px-2 items-center justify-between space-x-1 overflow-hidden transition-all duration-500 ease-in-out'>
                    <View className='flex-row w-4/5 space-x-2 items-center'>
                        <Checkbox value={item.isDone} />
                        <View className='w-1/2 '>
                            <Text numberOfLines={1} className={`w-2/3 font-bold ${item.isDone ? `line-through` : ''}`}>{item.content}</Text>
                            <Text className='text-xs'>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteTodo(item.id, item.content)}>
                        <Icon name={`trash`} color={'#EF4444'} />
                    </TouchableOpacity>
                </View>)}
            </ScrollView>
        }
    }


    return (
        <SafeAreaView >

            <View className={`w-full min-h-screen bg-orange-400 ${Platform.OS == 'android' ? `pt-8` : 'pt-4'}`}>
                {Platform.OS == 'android' && <View className='px-3'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' size={24} color={'white'} />
                    </TouchableOpacity>
                </View>}
                <Text className='text-center text-2xl font-bold py-20 broder-b'>{currentCategory.title}</Text>
                <View className='px-3'>
                    <View className='w-full h-full bg-gray-100 rounded-md shadow-md'>
                        <View className='bg-gray-300 w-full rounded-t-md p-4 z-30'>
                            <Text>{currentCategory._count.todoList} Tasks</Text>
                            <TouchableOpacity onPress={() => setShowAdd((prevs) => !prevs)} className=' absolute -bottom-5 right-2 bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full'>
                                <Icon name={showAdd ? `minus` : `plus`} color={'white'} />
                            </TouchableOpacity>
                        </View>
                        <View className={`w-full overflow-hidden ${showAdd ? 'h-fit pt-3' : 'h-0'} flex-row items-center space-x-1 px-1`}>
                            <Checkbox style={{ margin: 8 }} value={newTodo.isDone} onValueChange={(value) => setNewTodo((prevs) => ({ ...prevs, isDone: value }))} />
                            <TextInput placeholder='new todo...' value={newTodo.content} onChangeText={(val) => setNewTodo((prevs) => ({ ...prevs, content: val }))} className='w-1/2 border border-zinc-500 rounded-md p-2' />
                            <TextInput keyboardType='numeric' value={String(newTodo.prioerity)} onChangeText={handlePrioerity} className='border border-zinc-500 rounded-md p-2' />
                            <TouchableOpacity onPress={handleCreatingNewTodo} className='bg-orange-400 p-2 rounded-md'>
                                <Text className='text-gray-50' >Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        {contentRendering()}
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default CategoryModel