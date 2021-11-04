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
    'x-rapidapi-key': 'd215d48d9cmsh70fd20aaaf82139p17c47cjsnaab25fce9232'
  }
};

let propertyOptions = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/property',
    headers: {
      'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
      'x-rapidapi-key': 'd215d48d9cmsh70fd20aaaf82139p17c47cjsnaab25fce9232'
    }
  };

export const PropertyContext = React.createContext()

export default function App() {

  const mockData = [
    {
      id: 1,
      picture: "../images/2056434.jpeg",
      price: 517887,
      status: 'Active',
      beds: 3,
      baths: 3,
      sqft: 1364,
      living_space: 4364,
      address: '184 Valley View Ter, Mission Viejo, CA 92692',
      days_listed: 114,
      mls: 'OC22353432',
      agent: 'John Doe',
      broker: 'JD Realty',
      hoa: 659,
      property_tax: 0,
      home_insurance: 181,
      rent: 3200,
      zpid: '2222223234'
    },
    {
      id: 2,
      picture: "../images/unnamed.jpeg",
      price: 850000,
      status: 'Pending',
      beds: 3,
      baths: 3,
      sqft: 1939,
      living_space: 3964,
      address: 'Plan 2 Plan, Neo at Mission Foothils',
      days_listed: 29,
      mls: 'OC3628342',
      agent: 'John Doe',
      broker: 'JD Realty',
      hoa: 394,
      property_tax: 489,
      home_insurance: 298,
      rent: 3249,
      zpid: '2222223234'
    },
    {
      id: 3,
      picture: "../images/unnamed.jpeg",
      price: 464000,
      status: 'Active',
      beds: 3,
      baths: 3,
      sqft: 1939,
      living_space: 3964,
      address: 'Plan 2 Plan, Neo at Mission Foothils',
      days_listed: 29,
      mls: 'OC3628342',
      agent: 'John Doe',
      broker: 'JD Realty',
      hoa: 12,
      property_tax: 68,
      home_insurance: 239,
      rent: 2200,
      zpid: '2222223234'
    }
  ]

  const [address, setAddress] = useState('')
  const [currentProperty, setCurrentProperty] = useState({})
  const [propertyList, setPropertyList] = useState([])
  const [properties, setProperties] = useState(mockData)
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
          'brokerageName': null,
          // the following will default to null
          'propertyTaxRate': null,
          'zestimate': null,
          'rentZestimate': null,
          'associationFee': null,
          'hasHomeWarranty': null,
          'depositsAndFees': null,
          'hasAssociation': null,
          'hoaFee': null,
          'mortgageRates': {
            'armRate': null,
            'fifteenYearFixedRate': null,
            'thirtyYearFixedRate': null,
          },
          'mlsid': null,
          'listingAgent': null,
        }
        listOfProperties.push(createdProperty)
      }
      console.log(`created properties: ${listOfProperties[0]['address']}`)
      console.log(`created properties: ${listOfProperties[1]['address']}`)
      console.log(`created properties: ${listOfProperties[2]['address']}`)
      setPropertyList(prev => [...prev, listOfProperties])
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    requestInitialListings()
  }, [])

  useEffect(() => {
    console.log('property list has changed')
    console.log(propertyList)
  }, [propertyList])

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
    return parseInt(property.hoa) + parseInt(property.property_tax) + parseInt(property.home_insurance) + parseInt(monthlyPayment)
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

  function handleSelectPropertyById(id){
    setSelectedPropertyById(id)
  }

  function handleEditingMortagePaymentOpen(property){
    console.log(property)
    // setCurrentlyEditingMortgagePayments(true)
    // setSelectedPropertyById(id)
    // for(let i = 0; i < properties.length; i++){
    //   if(properties[i]['id'] === id){
    //     console.log(properties[i])
    //     setCurrentProperty(properties[i])
    //     console.log(currentProperty)
    //   }
    // }
  }

  function handleEditingMortagePaymentClose(id){
    setCurrentlyEditingMortgagePayments(false)
    setSelectedPropertyById('')
  }

  function handleEditingPropertyTaxOpen(id){
    setCurrentlyEditingPropertyTax(true)
    setSelectedPropertyById(id)
  }

  function handleEditingPropertyTaxClose(id){
    setCurrentlyEditingPropertyTax(false)
    setSelectedPropertyById('')
  }

  function handleEditingHomeInsuranceOpen(id){
    setCurrentlyEditingHomeInsurance(true)
    setSelectedPropertyById(id)
  }

  function handleEditingHomeInsuranceClose(id){
    setCurrentlyEditingHomeInsurance(false)
    setSelectedPropertyById('')
  }

  function handleEditingHOAOpen(id){
    setCurrentlyEditingHOA(true)
    setSelectedPropertyById(id)
  }

  function handleEditingHOAClose(id){
    setCurrentlyEditingHOA(false)
    setSelectedPropertyById('')
  }

  function handleEditingAdditionalExpensesOpen(id){
    setCurrentlyEditingAdditionalExpenses(true)
    setSelectedPropertyById(id)
  }

  function handleEditingAdditionalExpensesClose(id){
    setCurrentlyEditingAdditionalExpenses(false)
    setSelectedPropertyById('')
  }

  function handleEditingRentRevenueOpen(id){
    setCurrentlyEditingRentRevenue(true)
    setSelectedPropertyById(id)
  }

  function handleEditingRentRevenueClose(id){
    setCurrentlyEditingRentRevenue(false)
    setSelectedPropertyById('')
  }

  function handleMetricsOpen(id){
    setExpandedMetrics(true)
    setSelectedPropertyById(id)
  }

  function handleMetricsClose(id){
    setExpandedMetrics(false)
    setSelectedPropertyById('')
  }

  function handleHomePriceChange(e){
    console.log(e)
  }

  const propertyContextValue = {
    properties,
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
    setProperties,
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
