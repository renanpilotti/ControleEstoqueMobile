import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateFilter from './DateFilter';
import Icon from 'react-native-vector-icons/FontAwesome';

interface NoteType {
    id: number;
    date: string;
    note: string;
    quantity: string;
}

const Main: React.FC = () => {
    const [noteArray, setNoteArray] = useState<NoteType[]>([]);
    const [noteText, setNoteText] = useState<string>('');
    const [quantityText, setQuantityText] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString()); // Data atual para filtro

    // Carregar as notas armazenadas e a data ao iniciar o componente
    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedNotes = await AsyncStorage.getItem('notes');
                const storedDate = await AsyncStorage.getItem('currentDate');
                if (storedNotes) {
                    setNoteArray(JSON.parse(storedNotes));
                }
                if (storedDate) {
                    setCurrentDate(storedDate);
                }
            } catch (error) {
                console.error('Erro ao carregar dados armazenados', error);
            }
        };
        loadStoredData();
    }, []);

    // Função para salvar as notas no AsyncStorage
    const saveNotes = async (notes: NoteType[]) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
        } catch (error) {
            console.error('Erro ao salvar notas', error);
        }
    };

    // Função para salvar a data atual no AsyncStorage
    const saveCurrentDate = async (date: string) => {
        try {
            await AsyncStorage.setItem('currentDate', date);
        } catch (error) {
            console.error('Erro ao salvar data', error);
        }
    };

    // Função para adicionar uma nova nota
    const addNote = () => {
        if (noteText) {
            const date = new Date().toLocaleDateString();
            const newNote: NoteType = {
                id: noteArray.length > 0 ? noteArray[noteArray.length - 1].id + 1 : 1,
                date,
                note: noteText,
                quantity: quantityText
            };
            const updatedNotes = [...noteArray, newNote];
            setNoteArray(updatedNotes);
            saveNotes(updatedNotes); // Salva as notas após a alteração
            setNoteText('');
            setQuantityText('');
        }
    };

    // Função para deletar uma nota
    const deleteNote = (id: number) => {
        const updatedNotes = noteArray.filter((note) => note.id !== id);
        setNoteArray(updatedNotes);
        saveNotes(updatedNotes); // Salva as notas após a exclusão
    };

    // Função para filtrar as notas pela data
    const filterNotesByDate = () => {
        return noteArray.filter((note) => note.date === currentDate);
    };

    const updateCurrentDate = (data: string) => {
        setCurrentDate(data);
        saveCurrentDate(data); // Salva a nova data selecionada
    };

    // Filtra as notas com base na data atual
    const filteredNotes = filterNotesByDate().map((val) => (
        <View key={val.id} style={styles.note}>
            <Text style={styles.noteText}>{val.date}</Text>
            <Text style={styles.noteText}>{val.note}</Text>
            <Text style={styles.noteText}>{val.quantity}</Text>

            <TouchableOpacity onPress={() => deleteNote(val.id)} style={styles.noteDelete}>
                <Text><Icon name="trash" size={16} color="#fff" /></Text>
            </TouchableOpacity>
        </View>
    ));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Registro de Insumos</Text>
            </View>

            <View style={styles.dateNav}>
                <DateFilter updateCurrentDate={updateCurrentDate} />
            </View>

            <ScrollView style={styles.scrollContainer}>{filteredNotes}</ScrollView>

            <View style={styles.footer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Escreva aqui seu item"
                    onChangeText={setNoteText}
                    value={noteText}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Quantidade"
                    onChangeText={setQuantityText}
                    value={quantityText}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity onPress={addNote} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#1e5ee9',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    dateNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    navButton: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
    },
    dateText: {
        fontSize: 16,
        color: '#1e5ee9',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#1e5ee9',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#1e5ee9',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e5ee9',
        padding: 14,
        top: 10,
        bottom: 10,
        right: 10,
        height: '45%',
        margin: 'auto',
        borderRadius: 3
    }
});

export default Main;
