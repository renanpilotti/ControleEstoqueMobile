import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';

interface NoteProps {
    keyval: number;
    val: {
        date: string;
        note: string;
    };
    deleteMethod: (event: GestureResponderEvent) => void;
}

const Note: React.FC<NoteProps> = ({ keyval, val, deleteMethod }) => {
    return (
        <View key={keyval} style={styles.note}>
            <Text style={styles.noteText}>{val.date}</Text>
            <Text style={styles.noteText}>{val.note}</Text>

            <TouchableOpacity onPress={deleteMethod} style={styles.noteDelete}>
                <Text style={styles.noteDeleteText}>Xfdsfs</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
});

export default Note;
