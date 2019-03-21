import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    Switch
} from 'react-native';
import TaskRow from './TaskRow';

import store from '../../todoStore';
import { TASK_ACTION_TYPES, TASK_STATUS } from '../../constants/taskActionTypes';

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: "#F7F7F7",
        flex: 1,
        justifyContent: 'flex-start'
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    },
    toggleRow: {
        flexDirection: 'row',
        padding: 10,
    },
    toggleText: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 3
    }
});

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();

        store.subscribe(() => this.setState(store.getState()));
    }

    onDone = task => {
        const action = {
            type: TASK_ACTION_TYPES.DONE_TODO,
            task
        };
        store.dispatch(action);
    }

    onAddStarted = () => {
        this.props.navigation.navigate("form");
    }

    onToggle = () => {
        store.dispatch({
            type: TASK_ACTION_TYPES.TOGGLE_STATE,
        });
    }

    renderRow = ({ item }) => {
        return (
            <TaskRow
                todo={item}
                onDone={this.onDone} />
        );
    }

    render() {
        const { todos, filter } = this.state;
        return (
            <View style={styles.container}>
                <View
                    style={styles.toggleRow}>
                    <Switch
                        onValueChange={this.onToggle}
                        style={styles.switch}
                        value={this.state.filter !== TASK_STATUS.PENDING} />
                    <Text>
                        Showing {todos.length} {filter} todo(s)
                    </Text>

                </View>
                <FlatList
                    keyExtractor={item => item.task}
                    data={this.state.todos}
                    renderItem={this.renderRow} />
                <TouchableHighlight
                    onPress={this.onAddStarted}
                    style={styles.button}>
                    <Text
                        style={styles.buttonText}>Add one</Text>
                </TouchableHighlight>
            </View >
        );
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired
    }
}

export default TaskList;