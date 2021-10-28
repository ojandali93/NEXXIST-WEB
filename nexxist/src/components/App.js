import React, { useState } from 'react';
import HeaderSection from './HeaderSection.js';
import PropertyList from './PropertyList.js';
import axios from 'axios'
import '../css/app.css';

export const PropertyContext = React.createContext()

export default function App() {
  // let propertyList
  // let optionsProperties = {
  //   method: 'GET',
  //   url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
  //   params: {location: 'santa monica, ca', home_type: 'Houses'},
  //   headers: {
  //     'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
  //     'x-rapidapi-key': 'd215d48d9cmsh70fd20aaaf82139p17c47cjsnaab25fce9232'
  //   }
  // };

  // axios.request(optionsProperties).then(function (response) {
  //   propertyList = response.data.props
  //   let newProperty = {}
  //   for(let i = 0; i < 2; i++){
  //     newProperty['bathrooms'] = propertyList[i].bathrooms
  //     newProperty['propertyType'] = propertyList[i].propertyType
  //     newProperty['lotAreaValue'] = propertyList[i].lotAreaValue
  //     newProperty['address'] = propertyList[i].address
  //     newProperty['imgSrc'] = propertyList[i].imgSrc
  //     newProperty['price'] = propertyList[i].price
  //     newProperty['listingDateTime'] = propertyList[i].listingDateTime
  //     newProperty['listingStatus'] = propertyList[i].listingStatus
  //     newProperty['zpid'] = propertyList[i].zpid
  //     newProperty['daysOnZillow'] = propertyList[i].daysOnZillow
  //     newProperty['bedrooms'] = propertyList[i].bedrooms
  //     newProperty['country'] = propertyList[i].country
  //     newProperty['currency'] = propertyList[i].currency
  //     newProperty['livingArea'] = propertyList[i].livingArea
  //     newProperty['hasImage'] = propertyList[i].hasImage
  //     console.log(`new property ${newProperty.address}`)
  //   }
  //   setProperties([...properties, newProperty])
  // }).catch(function (error) {
  //   console.error(error);
  // });

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
    }
  ]

  const [address, setAddress] = useState('')
  const [properties, setProperties] = useState(mockData)
  const [selectedPropertyId, setSelectedPropertyById] = useState()
  const [selectedEditingPropertyLoan, setSelectedEditingPropertyLoan] = useState(false)
  const [propertyRevenueExpensesSelected, setPropertyRevenueExpensesSelected] = useState(false)

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
    let cashFlow = parseInt(property.rent) - calculateMonthlyMortgage(property.price)
    return cashFlow
  }

  function calculateOperatingExpenseRatio(property){
    let rent = parseInt(property.rent) * 12
    let revenue = 0
    let vaccancyRate = .94
    let grossOperatingIncome = (rent * vaccancyRate) + revenue
    return grossOperatingIncome
  }

  function calculateNetOperatingIncome(property){
    let goi = calculateOperatingExpenseRatio(property)
    let monthlyExpenses = parseInt(property.hoa) + parseInt(property.property_tax) + parseInt(property.home_insurance)
    let netOperatingIncome = goi - (monthlyExpenses * 12)
    return netOperatingIncome
  }

  function calculateReturnOnInvestment(property){
    let initialInvestment = calculateDownPayment(property.price) + (calculateClosingCost(property.price)) + (calculateLoanAmount(property.price) * .03)
    let annualRevenue = (property.rent * 12) - (calculateMontlyExpenses(property) * 12)
    let returnOnInvestment = (annualRevenue / initialInvestment) * 100
    return returnOnInvestment
  }

  function handlePropertyRevenueExpensesEdit(id){
    handleSelectPropertyById(id)
    setPropertyRevenueExpensesSelected(true)
  }

  function handlePropertyRevenueExpensesCollapse(){
    setPropertyRevenueExpensesSelected(false)
  }

  function handleSelectPropertyById(id){
    setSelectedPropertyById(id)
  }

  function handleSelectPropertyLoan(){
    setSelectedEditingPropertyLoan(true)
  }

  function handleSelectPropertyCash(){
    setSelectedEditingPropertyLoan(false)
  }

  const propertyContextValue = {
    properties,
    selectedPropertyId,
    selectedEditingPropertyLoan,
    propertyRevenueExpensesSelected,
    setProperties,
    calculateLoanAmount,
    calculateDownPayment,
    calculateClosingCost,
    calculateMonthlyMortgage,
    calculateMontlyExpenses,
    calculateCashFlow,
    calculateNetOperatingIncome,
    calculateReturnOnInvestment,
    handlePropertyRevenueExpensesEdit,
    handlePropertyRevenueExpensesCollapse,
    handleSelectPropertyLoan,
    handleSelectPropertyCash
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
