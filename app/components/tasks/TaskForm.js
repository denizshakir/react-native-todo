import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { TASK_ACTION_TYPES } from '../../constants/taskActionTypes';
import store from '../../todoStore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 150,
        backgroundColor: '#F7F7F7'
    },
    input: {
        borderWidth: 1,
        borderColor: '#D7D7D7',
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FAFAFA'
    },
    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#05A5D1',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelButton: {
        backgroundColor: '#666'
    }
});

class TaskForm extends React.Component {

    state = {
        task: ''
    }

    updateTask = text => this.setState({ task: text });

    add = () => {
        store.dispatch({
            type: TASK_ACTION_TYPES.ADD_TODO,
            task: this.state.task
        });
        this.props.navigation.goBack();
    }

    cancel = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.task}
                    onChangeText={this.updateTask} />

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.add}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, styles.cancelButton]}
                    onPress={this.cancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableHighlight>
            </View>
        );
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired
    }
}

export default TaskForm;