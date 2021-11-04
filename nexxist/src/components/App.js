import React, { useState, useEffect } from 'react';
import HeaderSection from './HeaderSection.js';
import PropertyList from './PropertyList.js';
import '../css/app.css';

const axios = require("axios").default;

let options = {
  method: 'GET',
  url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
  params: {location: 'santa monica, ca', home_type: 'Houses'},
  headers: {
    'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
    
  }
};

let propertyOptions = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/property',
    headers: {
      'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
      
    }
  };

export const PropertyContext = React.createContext()

export default function App() {

  const [address, setAddress] = useState('')
  const [currentProperty, setCurrentProperty] = useState({})
  const [propertyList, setPropertyList] = useState([])
  const [selectedPropertyId, setSelectedPropertyById] = useState()
  const [currentlyEditingMortgagePayments, setCurrentlyEditingMortgagePayments] = useState(false)
  const [currentlyEditingPropertyTax, setCurrentlyEditingPropertyTax] = useState(false)
  const [currentlyEditingHomeInsurance, setCurrentlyEditingHomeInsurance] = useState(false)
  const [currentlyEditingHOA, setCurrentlyEditingHOA] = useState(false)
  const [currentlyEditingAdditionalExpenses, setCurrentlyEditingAdditionalExpenses] = useState(false)
  const [currentlyEditingRentRevenue, setCurrentlyEditingRentRevenue] = useState(false)
  const [expandedMetrics, setExpandedMetrics] = useState(false)

  function requestInitialListings(){
    axios.request(options).then(function (response) {
      let resultList = response.data.props
      console.log(resultList)
      let listOfProperties = []
      for(let i = 0; i < 10; i++){
        let currentProperty = resultList[i]
        let createdProperty = {
          'address': currentProperty['address'],
          'bathrooms': currentProperty['bathrooms'],
          'bedrooms': currentProperty['bedrooms'],
          'country': currentProperty['country'],
          'currency': currentProperty['currency'],
          'daysOnZillow': currentProperty['daysOnZillow'],
          'hasImage': currentProperty['hasImage'],
          'imgSrc': currentProperty['imgSrc'],
          'listingStatus': currentProperty['listingStatus'],
          'livingArea': currentProperty['livingArea'],
          'lotAreaUnit': currentProperty['lotAreaUnit'],
          'lotAreaValue': currentProperty['lotAreaValue'],
          'price': currentProperty['price'],
          'propertyType': currentProperty['propertyType'],
          'zpid': currentProperty['zpid'],
          'brokerageName': 'JD realty',
          // the following will default to null
          'propertyTaxRate': 0,
          'taxAnnualAmount': 10000,
          'homeInsurance': 0,
          'zestimate': 0,
          'rentZestimate': 5000,
          'associationFee': 49,
          'hasHomeWarranty': false,
          'depositsAndFees': 0,
          'hasAssociation': false,
          'hoaFee': 49,
          'mortgageRates': {
            'armRate': 0,
            'fifteenYearFixedRate': 0,
            'thirtyYearFixedRate': 0,
          },
          'mlsid': '1111111111',
          'listingAgent': 'John Doe',
        }
        listOfProperties.push(createdProperty)
      }
      setPropertyList(listOfProperties)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    requestInitialListings()
  }, [])

  useEffect(() => {
    if(propertyList.length > 0){
      console.log('all properties added:')
      console.log(propertyList)
      // completeBuildingProperties()
    }
  }, [propertyList])

  function completeBuildingProperties(){
    for(let i = 0; i < propertyList.length; i++){
      console.log(propertyList[i]['zpid'])
      propertyOptions['params'] = {zpid: propertyList[i]['zpid']}
      axios.request(propertyOptions).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }
  }

  function calculateLoanAmount(price){
    return parseInt(price * .8)
  }

  function calculateDownPayment(price){
    return parseInt(price * .2)
  }

  function calculateClosingCost(price){
    let closingCost = calculateLoanAmount(price) * .03
    return parseInt(closingCost)
  }

  function calculateMonthlyMortgage(price){
    let loanAmount = parseInt(price) * .8
    let interestRate = .0315 / 12
    let powerRate = Math.pow(1 + interestRate, 360)
    let monthlyPayment = parseInt(loanAmount) * (interestRate * powerRate) / (powerRate - 1)
    return monthlyPayment
  }

  function calculateMontlyExpenses(property){
    let monthlyPayment = calculateMonthlyMortgage(property.price)
    let totalMonthly = parseInt(property.hoaFee) + parseInt(property.taxAnnualAmount) + parseInt(property.homeInsurance) + parseInt(monthlyPayment)
    return totalMonthly
  }

  function calculateCashFlow(property){
    let cashFlow = parseInt(property.rent) - calculateMontlyExpenses(property)
    return cashFlow
  }

  function calculateCashOnCashFlow(property){
    let cashReceived = property.rent
    let cashInvested = calculateDownPayment(property.price)
    let cashOnCashReturn = (cashReceived * 12) / cashInvested
    let finalCashOnCashFlow = cashOnCashReturn * 100
    return finalCashOnCashFlow
  }

  function calculateGrossOperatingIncome(property){
    let rent = parseInt(property.rent) * 12
    let revenue = 0
    let vaccancyRate = .94
    let grossOperatingIncome = (rent * vaccancyRate) + revenue
    return grossOperatingIncome
  }

  function calculateOperatingExpenseRatio(property){
    let goi = calculateGrossOperatingIncome(property)
    let monthlyExpenses = calculateMontlyExpenses(property)
    let operatingExpenseRatio = ((monthlyExpenses * 12) / goi) * 100
    return operatingExpenseRatio
  }

  function calculateNetOperatingIncome(property){
    let goi = calculateGrossOperatingIncome(property)
    let monthlyExpenses = parseInt(property.hoa) + parseInt(property.property_tax) + parseInt(property.home_insurance)
    let netOperatingIncome = goi - (monthlyExpenses * 12)
    return netOperatingIncome
  }

  function calculateReturnOnInvestment(property){
    let initialInvestment = calculateDownPayment(property.price) + (calculateClosingCost(property.price))
    let annualRevenue = (property.rent * 12) - (calculateMontlyExpenses(property) * 12)
    let returnOnInvestment = (annualRevenue / initialInvestment) * 100
    return returnOnInvestment
  }

  function calculateRentCostRatio(property){
    let annualRent = property.rent* 12
    let price = property.price
    let rentPriceRatio = (annualRent / price) * 100
    return rentPriceRatio
  }

  function calculateGrossRentMultiplier(property){
    let annualRent = property.rent* 12
    let price = property.price
    let grossRentMultiplier = (price / annualRent)
    return grossRentMultiplier
  }

  function calculateVaccancyRate(property){
    let vacancyRateDays = Math.round(.08 * 365)
    let rent = property.rent * 12
    let vaccancyRate = .94 
    let annualRate = (rent * vaccancyRate) / vacancyRateDays
    return annualRate
  }

  // the following are event handlers

  function handleSelectPropertyById(zpid){
    setSelectedPropertyById(zpid)
  }

  function handleEditingMortagePaymentOpen(property){
    setCurrentlyEditingMortgagePayments(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingMortagePaymentClose(){
    setCurrentlyEditingMortgagePayments(false)
    setSelectedPropertyById('')
  }

  function handleEditingPropertyTaxOpen(property){
    setCurrentlyEditingPropertyTax(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingPropertyTaxClose(){
    setCurrentlyEditingPropertyTax(false)
    setSelectedPropertyById('')
  }

  function handleEditingHomeInsuranceOpen(property){
    setCurrentlyEditingHomeInsurance(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingHomeInsuranceClose(){
    setCurrentlyEditingHomeInsurance(false)
    setSelectedPropertyById('')
  }

  function handleEditingHOAOpen(property){
    setCurrentlyEditingHOA(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingHOAClose(){
    setCurrentlyEditingHOA(false)
    setSelectedPropertyById('')
  }

  function handleEditingAdditionalExpensesOpen(property){
    setCurrentlyEditingAdditionalExpenses(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingAdditionalExpensesClose(){
    setCurrentlyEditingAdditionalExpenses(false)
    setSelectedPropertyById('')
  }

  function handleEditingRentRevenueOpen(property){
    setCurrentlyEditingRentRevenue(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleEditingRentRevenueClose(){
    setCurrentlyEditingRentRevenue(false)
    setSelectedPropertyById('')
  }

  function handleMetricsOpen(property){
    setExpandedMetrics(true)
    setSelectedPropertyById(property.zpid)
  }

  function handleMetricsClose(){
    setExpandedMetrics(false)
    setSelectedPropertyById('')
  }

  function handleHomePriceChange(e){
    console.log(e)
  }

  const propertyContextValue = {
    propertyList,
    currentProperty,
    selectedPropertyId,
    currentlyEditingMortgagePayments,
    currentlyEditingPropertyTax,
    currentlyEditingHomeInsurance,
    currentlyEditingHOA,
    currentlyEditingAdditionalExpenses,
    currentlyEditingRentRevenue,
    expandedMetrics,
    setPropertyList,
    calculateLoanAmount,
    calculateDownPayment,
    calculateClosingCost,
    calculateMonthlyMortgage,
    calculateMontlyExpenses,
    calculateCashFlow,
    calculateNetOperatingIncome,
    calculateReturnOnInvestment,
    calculateCashOnCashFlow,
    calculateGrossOperatingIncome,
    calculateOperatingExpenseRatio,
    calculateRentCostRatio,
    calculateGrossRentMultiplier,
    calculateVaccancyRate,
    handleSelectPropertyById,
    handleEditingMortagePaymentOpen,
    handleEditingMortagePaymentClose,
    handleEditingPropertyTaxOpen,
    handleEditingPropertyTaxClose,
    handleEditingHomeInsuranceOpen,
    handleEditingHomeInsuranceClose,
    handleEditingHOAOpen,
    handleEditingHOAClose,
    handleEditingAdditionalExpensesOpen,
    handleEditingAdditionalExpensesClose,
    handleEditingRentRevenueOpen,
    handleEditingRentRevenueClose,
    handleMetricsOpen,
    handleMetricsClose,
    handleHomePriceChange
  }

  return (
    <div>
      <PropertyContext.Provider value={propertyContextValue}>
        <HeaderSection address={address} setAddress={setAddress}/>
        <PropertyList></PropertyList>
      </PropertyContext.Provider>
    </div>
  )
}
