import React from 'react';
import { Link } from 'react-router-dom';
import BotMessage from '../../components/Floating_Btn/Bot';
import SignupHero from './SignupHero'
import TrustBadges from './TrustBadges'
import BenefitsSection from './BenefitsSection'

export const Home = () => {
	return (
		<div className='min-h-screen bg-swinxter-dark'>
			<SignupHero />
			<TrustBadges />
			<BenefitsSection />
		</div>
	);
};
