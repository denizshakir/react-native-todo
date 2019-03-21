import React from 'react';
import TaskList from './app/components/tasks/TaskList';
import TaskForm from './app/components/tasks/TaskForm';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  list: {
    screen: TaskList,
    navigationOptions: () => ({
      title: "Tasks"
    })
  },
  form: {
    screen: TaskForm,
    navigationOptions: () => ({
      title: "Add form"
    })
  },
});

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer;