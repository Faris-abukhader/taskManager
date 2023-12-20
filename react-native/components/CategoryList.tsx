import { ScrollView, FlatList, View, ActivityIndicator, Text, Image } from 'react-native'
import { memo, useEffect, useState } from 'react'
import TaskCategoryCard from './TaskCategoryCard'
import { useStore } from '../zustand/todoStore'
import { Api } from '../utils/axois'
import { Category } from '../utils/type'

const CategoryList = () => {
    const [loading, setLoading] = useState(false)
    const { categories, setCategories, secret } = useStore(state => state)

    useEffect(() => {
        setLoading(true)
        Api(secret).get<Category[]>('/category/all')
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const contentRendering = () => {
        if (loading) {
            return <ActivityIndicator />
        } else if (categories.length == 0) {
            return <View className='w-full h-screen bg-white flex items-center justify-center  overflow-hidden'>
                <View className='w-2/3 -mt-32'>
                    <Image className='w-2/3 h-64 self-center' source={require('../assets/empty-box.png')} />
                    <Text className='text-center'>You don't have any task category created yet.</Text>
                </View>
            </View>
        } else {
            return <View className='p-3 pb-10'>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <TaskCategoryCard category={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        }
    }

    return (
        <ScrollView>
            {contentRendering()}
        </ScrollView>
    )
}

export default memo(CategoryList)