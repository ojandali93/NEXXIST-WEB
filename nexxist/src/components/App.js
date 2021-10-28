import React, { useState } from 'react';
import HeaderSection from './HeaderSection.js';
import PropertyList from './PropertyList.js';
import '../css/app.css';

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
  const [currentlyEditingMortgagePayments, setCurrentlyEditingMortgagePayments] = useState(false)
  const [currentlyEditingPropertyTax, setCurrentlyEditingPropertyTax] = useState(false)
  const [currentlyEditingHomeInsurance, setCurrentlyEditingHomeInsurance] = useState(false)
  const [currentlyEditingHOA, setCurrentlyEditingHOA] = useState(false)
  const [currentlyEditingAdditionalExpenses, setCurrentlyEditingAdditionalExpenses] = useState(false)
  const [currentlyEditingRentRevenue, setCurrentlyEditingRentRevenue] = useState(false)

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

  function handleSelectPropertyById(id){
    setSelectedPropertyById(id)
  }

  function handleEditingMortagePaymentOpen(id){
    setCurrentlyEditingMortgagePayments(true)
    setSelectedPropertyById(id)
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

  const propertyContextValue = {
    properties,
    selectedPropertyId,
    currentlyEditingMortgagePayments,
    currentlyEditingPropertyTax,
    currentlyEditingHomeInsurance,
    currentlyEditingHOA,
    currentlyEditingAdditionalExpenses,
    currentlyEditingRentRevenue,
    setProperties,
    calculateLoanAmount,
    calculateDownPayment,
    calculateClosingCost,
    calculateMonthlyMortgage,
    calculateMontlyExpenses,
    calculateCashFlow,
    calculateNetOperatingIncome,
    calculateReturnOnInvestment,
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
    handleEditingRentRevenueClose
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
