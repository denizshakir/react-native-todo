import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Animated
} from 'react-native';
import { TASK_STATUS } from '../../constants/taskActionTypes';

const img = require('../../assets/done.png');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    label: {
        fontSize: 20,
        fontWeight: "300"
    },
    doneButton: {
        borderRadius: 5,
        backgroundColor: '#EAEAEA',
        padding: 5
    }
});

const TaskRow = props => {
    const doneAnimation = new Animated.ValueXY();
    const localStyle = StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            backgroundColor: '#EAEAEA',
            padding: 5
        },
        row: {
            transform: doneAnimation.getTranslateTransform()
        }
    });

    const animatedPress = () => {
        Animated.spring(doneAnimation, {
            tension: 2,
            friction: 3,
            toValue: {
                x: -500,
                y: 0
            }
        }).start();

        setTimeout(() => {
            props.onDone(props.todo.task);
        }, 1000)
    };

    const { todo } = props;
    return (
        <Animated.View style={[styles.container, localStyle.row]}>
            <Text style={styles.label}>{todo.task}</Text>
            {todo.state === TASK_STATUS.PENDING ?
                <TouchableHighlight
                    underlayColor="#ddd"
                    style={styles.doneButton}
                    onPress={animatedPress}>
                    <Image
                        source={img} />
                </TouchableHighlight> : null}
        </Animated.View>
    );
}

TaskRow.propTypes = {
    onDone: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        task: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
    }).isRequired
}

export default TaskRow;