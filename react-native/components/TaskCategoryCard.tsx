import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useStore } from '../zustand/todoStore';
import { useNavigation } from '@react-navigation/native';
import { Category } from '../utils/type';
import { Api } from '../utils/axois';

const TaskCategoryCard = ({ category: { id, title, owner, todoList, _count } }: { category: Category }) => {
    const navigation = useNavigation()
    const { setCurrentCategory, secret, deleteCategory } = useStore(state => state)
    const [showAll, setShowAll] = useState(false)
    const [data, setData] = useState(todoList.slice(0, 2))

    useEffect(() => {
        if (showAll) {
            setData(todoList)
        } else {
            setData(todoList.slice(0, 2))
        }
    }, [showAll])

    const handleOnClick = () => {
        setCurrentCategory({ id, title, owner, todoList, _count })
        navigation.navigate('category')
    }

    const deleteCategoryHandler = () => {
        Alert.alert('Delete Category', `Are you sure you want to delete ${title}`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Confirm', onPress: () => Api(secret).delete(`/category/${id}`)
                    .then(() => {
                        deleteCategory(id)
                    })
                    .catch(err => console.log(err))
            },
        ]);


    }


    const renderItem = (data: Category['todoList'][0], i) => (
        <View key={i} className='w-1/2 flex-row items-center space-x-1 overflow-hidden transition-all duration-500 ease-in-out'>
            <Text numberOfLines={1} className={data.isDone ? `line-through` : ''}>{data.content}</Text>
        </View>
    );
    return (
        <View className='bg-orange-300 rounded-md p-2 overflow-hidden mb-4'>
            <View className='flex-row items-center justify-between'>
                <TouchableOpacity onPress={handleOnClick}>
                    <Text className='text-lg font-bold p-2'>{title} <Text className='text-xs text-gray-600'>{_count.todoList} Tasks</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteCategoryHandler}>
                    <Icon name='trash' size={16} color={'#EF4444'} />
                </TouchableOpacity>
            </View>
            <Grid
                renderItem={renderItem} // call method to render style to item
                // renderPlaceholder={this.renderPlaceholderItem} // call method to render placeholder item
                data={data}
                numColumns={2}
            />
            {todoList.length > 2 && <View className='w-full flex-row py-2 justify-center'>
                <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                    <Icon name={showAll ? `chevron-up` : `chevron-down`} />
                </TouchableOpacity>
            </View>}
        </View>
    )
}

export default TaskCategoryCard