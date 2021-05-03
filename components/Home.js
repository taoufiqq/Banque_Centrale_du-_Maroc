import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";

import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Pressable, Picker, TextInput, TextComponent } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

// const image = { uri: "https://image.freepik.com/free-vector/realistic-polygonal-background_52683-61087.jpg" };

function HomeScreen({navigation}) {
  const [selectedFromValue, setSelectedFromValue] = useState("EUR");
  const [selectedToValue, setSelectedToValue] = useState(String);

  const [selectedCurrency, setSelectedCurrency] = useState([]);

  const [input, setInput] = useState()

  const [currencyVal, setCurrencyVal] = useState(0)

  const getDataUsingSimpleGetCall = async () => {
    let data = {currencyVal: currencyVal}
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
      }
    };

    await axios
      .get('http://api.exchangeratesapi.io/v1/latest?access_key=a70fcf85df4e14575510d3103cf29f2d&symbols=USD,AUD,CAD,PLN,MXN&format=1')
      .then(function (response) {
        setSelectedCurrency(response.data.rates)
   
      })
      .catch(function (error) {
        console.log(error.message);
      })

      if(selectedToValue == "USD")
        setCurrencyVal(selectedCurrency.USD * input)

      if(selectedToValue == "CAD")
        setCurrencyVal(selectedCurrency.CAD * input)

      if(selectedToValue == "AUD")
        setCurrencyVal(selectedCurrency.AUD * input)

      if(selectedToValue == "EUR")
        setCurrencyVal(selectedCurrency.EUR * input)

      if(selectedToValue == "MXN")
        setCurrencyVal(selectedCurrency.MXN * input)

      if(selectedToValue == "PLN")
        setCurrencyVal(selectedCurrency.PLN * input)

      console.log(currencyVal)

      await axios.post('https://currencyexchangeb.herokuapp.com/addData', data)
      .then(() => {
        console.log("data is inserted")
      })
      .catch((e) => {
        console.log("data is not inserted" + e)
      })
  };

  return (
    <View style={styles.container1}>

        <SafeAreaView style={styles.container2}>
          <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFFFFF" translucent = {false}/>

          <View style={styles.contents2}>
              <Picker
                selectedValue={selectedFromValue}
                style={{color: 'white', height: 60, width: 250}}
                onValueChange={(itemValue, itemIndex) => setSelectedFromValue(itemValue)}
              >
                <Picker.Item label="EUR" value="EUR" />
              </Picker>

              <FontAwesome5 name="exchange-alt" size={40} color="white" />
              <Picker
                selectedValue={selectedToValue}
                style={{color: 'white', height: 60, width: 250, borderColor:'white'}}
                onValueChange={(itemValue, itemIndex) => setSelectedToValue(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="MXN" value="MXN" />
                <Picker.Item label="PLN" value="PLN" />
               
              </Picker>

              <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>Exchange Currency</Text>

              <TextInput
                style={styles.default}
                onChangeText={(text) => setInput(text)}
                value={input}
                keyboardType="numeric"
              />

              {selectedToValue == "USD" && (
                  <Text style={{color: '#FFFFFF'}}>USD: {selectedCurrency.USD * input}</Text>
              )}
              {selectedToValue == "CAD" && (
                  <Text style={{color: '#FFFFFF',fontSize: 30}}>CAD: {selectedCurrency.CAD * input}</Text>
              )}
              {selectedToValue == "AUD" && (
                  <Text style={{color: '#FFFFFF',fontSize: 30}}>AUD: {selectedCurrency.AUD * input}</Text>
              )}
              {selectedToValue == "EUR" && (
                  <Text style={{color: '#FFFFFF',fontSize: 30}}>EUR: {selectedCurrency.EUR * input}</Text>
              )}
              {selectedToValue == "MXN" && (
                  <Text style={{color: '#FFFFFF',fontSize: 30}}>MXN: {selectedCurrency.MXN * input}</Text>
              )}
              {selectedToValue == "PLN" && (
                  <Text style={{color: '#FFFFFF',fontSize: 30}}>PLN: {selectedCurrency.PLN * input}</Text>
              )}

      
            
          </View>

          <View style={styles.contents}>

          <Pressable onPress={() => { getDataUsingSimpleGetCall() }} style={[styles.contentsText, styles.marginButtom]}>
            <Text style={[styles.contentsText2]}>CONVERT</Text>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate('currencyTable') }} style={[styles.contentsText, styles.marginButtom]}>
            <Text style={[styles.contentsText2]}>TABLE CURRENCY</Text>
          </Pressable>

          </View>
        </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 0.6
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 2
  },
  contents: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contents2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginButtom: {
    marginBottom: 10
  },
  contentsText: {
    color: '#000000',
    padding: 10,
    width: '80%',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 15
  },
  contentsText2: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 15
  },
  default: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 50,
    borderRadius:20,
    marginTop:30
  }
});

export default HomeScreen

