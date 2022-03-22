import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes';
import { Template } from './components/MainComponents';
import { Header } from './components/partials/Header/Header'
import { Footer } from './components/partials/Footer/Footer'

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />

        <MainRoutes />

        <Footer />
      </Template>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Page);