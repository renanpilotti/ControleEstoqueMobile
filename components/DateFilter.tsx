import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyComponent = ( {updateCurrentDate} : any ) => {
    const [currentDate, setCurrentDate] = useState<string>('28/11/2024');

    const nextDay = () => {
        const nextDate = new Date(currentDate.split('/').reverse().join('-'));
        nextDate.setDate(nextDate.getDate() + 2); // Avança 2 dias
        const updatedDate = nextDate.toLocaleDateString('pt-BR');
        setCurrentDate(updatedDate);
        updateCurrentDate(updatedDate);
    };

    const previousDay = () => {
        const prevDate = new Date(currentDate.split('/').reverse().join('-'));
        prevDate.setDate(prevDate.getDate()); // Retrocede 1 dia
        const updatedDate = prevDate.toLocaleDateString('pt-BR');
        setCurrentDate(updatedDate);
        updateCurrentDate(updatedDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                {/* Botão de retroceder um dia */}
                <TouchableOpacity onPress={previousDay} style={styles.iconButton}>
                    <Icon name="chevron-left" size={30} color="#000" />
                </TouchableOpacity>

                {/* Botão de avançar dois dias */}
                <TouchableOpacity onPress={nextDay} style={styles.iconButton}>
                    <Icon name="chevron-right" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        position: 'relative'
    },
    dateContainer: {
        marginBottom: 13,
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        position: 'absolute'
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
});

export default MyComponent;
