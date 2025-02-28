import { Shield, Users, Lock } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';

const TrustBadges = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto py-20 px-4'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<span className='flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group cursor-pointer'>
							<div className='p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6'>
								<Users className='w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500' />
							</div>
							<h3 className='text-2xl font-semibold mb-3 text-white/90'>
								Find Trust, Not Lies
							</h3>
							<p className='text-gray-400 leading-relaxed'>
								The Power of Full Identity Verification in Online Dating
							</p>
						</span>
					</TooltipTrigger>
					<TooltipContent className='w-80 bg-gradient-to-br from-black/90 to-black/95 border border-swinxter-primary/20 text-white p-6'>
						<div className='space-y-3'>
							<p className='text-sm text-gray-300 leading-relaxed'>
								Online dating should be exciting, safe, and real—but we all know
								there are risks out there. That's where Full Identity
								Verification steps in as your digital wingman!
							</p>
							<ul className='space-y-2'>
								<li className='flex items-center gap-2 text-sm text-gray-300'>
									<span className='text-swinxter-primary'>✅</span> Say goodbye
									to fake profiles
								</li>
								<li className='flex items-center gap-2 text-sm text-gray-300'>
									<span className='text-swinxter-primary'>✅</span> Protect your
									privacy while meeting real people
								</li>
								<li className='flex items-center gap-2 text-sm text-gray-300'>
									<span className='text-swinxter-primary'>✅</span> Build trust
									from the first hello
								</li>
							</ul>
							<p className='text-sm text-gray-300 leading-relaxed mt-3'>
								With verified profiles, you can focus on building meaningful
								connections instead of worrying about who's behind the screen.
								Full Identity Verification ensures the people you meet are
								exactly who they claim to be. Because love deserves honesty.
							</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<span className='flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group cursor-pointer'>
							<div className='p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6'>
								<Shield className='w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500' />
							</div>
							<h3 className='text-2xl font-semibold mb-3 text-white/90'>
								Verified Profiles
							</h3>
							<p className='text-gray-400 leading-relaxed'>
								Safe and secure environment
							</p>
						</span>
					</TooltipTrigger>
					<TooltipContent className='w-80 bg-gradient-to-br from-black/90 to-black/95 border border-swinxter-primary/20 text-white p-6'>
						<div className='flex flex-col gap-2'>
							<h4 className='font-semibold text-lg text-swinxter-primary'>
								3rd Party Verification
							</h4>
							<p className='text-sm text-gray-300 leading-relaxed'>
								We partner with trusted third-party verification services to
								ensure member authenticity. Your data remains secure and is
								never stored on our servers.
							</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<span className='flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group cursor-pointer'>
							<div className='p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6'>
								<Lock className='w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500' />
							</div>
							<h3 className='text-2xl font-semibold mb-3 text-white/90'>
								Privacy First
							</h3>
							<p className='text-gray-400 leading-relaxed'>
								Your data is always protected
							</p>
						</span>
					</TooltipTrigger>
					<TooltipContent className='w-80 bg-gradient-to-br from-black/90 to-black/95 border border-swinxter-primary/20 text-white p-6'>
						<p className='text-sm text-gray-300 leading-relaxed'>
							Your privacy is our top priority. We use advanced security
							measures to ensure your personal data is always kept safe. You can
							enjoy your experience with complete peace of mind, knowing your
							information is protected.
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default TrustBadges;
