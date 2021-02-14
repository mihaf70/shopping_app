import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors'



type Props ={
    title:string,


}

const Header = (props:Props) =>
{
    return(
        <View style ={styles.header}>
            <Text style = {styles.headerTitle}>{props.title}</Text>
        </View>
    );  
};

const styles = StyleSheet.create({

    header:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle:{
        color: 'black',
        fontSize:22,
        //fontFamily: 'Quicksand-SemiBold'
        

    }
});

export default Header;