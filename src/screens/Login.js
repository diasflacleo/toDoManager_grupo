import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Image, TextInput, Button, Text, Alert, Keyboard } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';


//https://www.npmjs.com/package/validator
// foi considerado o numero de downloads como se fosse um parâmetro para escolher uma lib ou descartar a mesma.
import validator from 'validator';


const img = require('../assets/TodoList.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            //email: '',
            emailField: '',
            passwordField: ''
        };
    }

    //------------
// função para validar o formulario do login
// para mais informações olhar o tutorial https://www.youtube.com/watch?v=65Fn0nEBVqI
   

    //validaçao sem lib nenhuma
   /* if (emailField == ""){
        alert('Please type an email address to sign in.');
        //this.setState({Error: 'Please type an email address to sign in.'});
        
    }else {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(emailField) === false){
            alert('Invalid email format. Please check your email.');
            //this.setState({Error: 'Invalid email format. Please check your email.'});
        }else{
            if(passwordField == ""){
                alert('Please type a password to sign in.');    
                //this.setState({Error: 'Please type a password to sign in.'});
            }else{
                alert('All fields are filled out.')
                //this.setState({Error: 'All fields are filled out'});
            }

        }
        //se tudo correr bem na validação ele segue para a página destino.
    }*/
    

    //------------

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                <Text style={{color:'red', textAlign:'center'}}>
                        {this.state.Error}
                    </Text>
                    <TextInput style={styles.input}
                        
                        placeholder='Email'
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        onChangeText={
                            emailField => this.setState({ emailField })
                        } />
                    <TextInput style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={
                            passwordField => this.setState({ passwordField })
                        } />
                    <Button title='Sign In'
                        onPress={async () => await this.signInAsync()} />
                    <View style={styles.textConteiner}>
                        <Text>Not a member? Let's </Text>
                        <Text style={styles.textRegister}
                            onPress={() => this.props.navigation.navigate('pageRegister')}>
                            Register
                            </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    async signInAsync() {
        try {
            //----------
            //validação com o validator.js
            const {emailField, passwordField} = this.state;
            if (emailField == ""){
                //alert('Please type an email address to sign in.');
                this.setState({Error: 'Please type an email address to sign in.'});

                
            }else{
                if(validator.isEmail(emailField) == false){           
                    //alert('validator: invalid email');
                    this.setState({Error: 'validator: invalid email'});
                }else{
                    if(passwordField == ""){
                        //alert('Please type a password to sign in.');    
                        this.setState({Error: 'Please type a password to sign in.'});
                    }else{
                        //----------
                        const user = await signInOnFirebaseAsync(
                            this.state.emailField,
                            this.state.passwordField
                        );
                        // const message = `User ${user.email} authenticated`;
                        // Alert.alert('User Authenticated', message);
                        const resetNavigation = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions
                                .navigate({ routeName: 'pageTaskList' })]
                        });
                        this.props.navigation.dispatch(resetNavigation);
                    }
                }
                
            }
   
            

        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});