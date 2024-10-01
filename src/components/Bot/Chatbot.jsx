import React from 'react'
import { Link } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
export const Chatbot = () => {
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#EF6C00',
        headerFontColor: '#fff',
        headerFontSize: '20px',
        botBubbleColor: '#EF6C00',
        botFontColor: '#fff',
        botFontSize:"25px",
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
        userFontSize:"25px"
      };
    

  return (
    <>
     <ThemeProvider theme={theme}>
      <ChatBot
                steps={[ 
                    {
                        id: '1',
                        message:"Hi there",
                        trigger: '2',
                    },
                    {
                        id: '2',
                        message: 'What is your query?',
                        trigger: '3',
                    },
                    {
                        id: '3',
                        options: [
                            { value: 'live-chat', label: 'Live Chat', trigger: 'live' },
                            { value: 'email', label: 'Email', trigger: 'email' },
                            { value: 'help', label: 'Help', trigger: 'help' },
                        ]
                    },
                    {
                        id: 'email',
                        component: <Link to="/contact">Click here</Link>,
                        asMessage: true,
                        trigger:4
                      },
                    {
                        id: '4',
                        message: 'Thanks & Welcome to Swinxter® Family!',
                        end:true
                      },
                    {
                        id: 'live',
                        message:"You'll be able to use this feature soon!",
                        trigger:4
                      },
                    {
                        id: '8',
                        message:"Welcome to Swinxter® Family ",
                        trigger:'9'
                      },{
                        id: '9',
                        message: 'What is your name?',
                        trigger: 'name',
                      },
                      {
                        id: 'name',
                        user: true,
                        trigger: '10',
                      },
                      {
                        id: '10',
                        message: 'Hi {previousValue}! What is your gender?',
                        trigger: 'gender',
                      },
                    {
                        id: 'help',
                        component: <Link to="/faq">Click here</Link>,
                        asMessage: true,
                        trigger:4
                      },
                    {
                        id: 'gender',
                        options: [
                            { value: 'male', label: 'Male', trigger: '5' },
                            { value: 'female', label: 'Female', trigger: '5' },
                        ],
                    },
                    {
                        id: '5',
                        message: 'How old are you?',
                        trigger: 'age',
                    },
                    {
                        id: 'age',
                        user: true,
                        trigger: 'end-message',
                        validator: (value) => {
                            if (isNaN(value)) {
                                return 'value must be a number';
                            } else if (value < 0) {
                                return 'value must be positive';
                            } else if (value > 120) {
                                return `${value}? Come on!`;
                            }
                            return true;
                        },
                    },
                    {
                        id: 'end-message',
                        message: 'Thanks! Your data was submitted successfully!',
                        end: true,
                    },
                ]}
            /></ThemeProvider>
    </>
  )
}
