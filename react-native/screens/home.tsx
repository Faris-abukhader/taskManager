import { View, StatusBar } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import AddCategoryDialog from '../components/AddCategoryDialog'
import CategoryList from '../components/CategoryList'

const Home = ({ navigation }) => {
    return (
        <View>
            <AddCategoryDialog />
            <StatusBar />
            <Header navigation={navigation} />
            <CategoryList />
        </View>
    )
}

export default Home