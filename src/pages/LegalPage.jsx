import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import "./styles/legal.css"
import privacy from "../static/privacy";
import terms from "../static/terms";

const LegalPage = () => {
    const index = useParams().index;
    const protectKid = [
        "In our ongoing efforts at Swinxter to make your experience as enjoyable and safe as possible, we have created this document to help parents understand how to protect their children from inappropriate content on the Internet.",
        "To protect your family, the first step would be to install parental control software on your computer. The best known and most effective programs are CyberPatrol, Net Nanny and Safety Surf. Some of the Internet providers have content filtering included with their services. Please check with your Internet Service Provider if this option is offered.",
        "Parental control software blocks access to specific websites and online content. In most cases, when you purchase this type of software, it already contains a large list of sites inappropriate for children. You can then update this software on the manufacturer's website or, most of the time, the software update is done automatically.",
        "Another way this software works is to block sites using keywords, such as 'sex'. However, filtering apps aren't just about blocking access to adult content. You can configure the application to filter other topics such as: tobacco, drugs, alcohol, violence and racism.",
        "If your computer is shared by all family members (including children), you can set up a system to only filter adult content during certain hours; for example: when you are working and there is no one to supervise the children. You can also create different user accounts and access yours with a password, known only to you, to create restrictions.",
        "Some of these programs may also block your personal information, such as: name, address and telephone number from being sent from your computer. This is a great way to protect children from potential online predators.",
        "Several programs allow you to create different levels of security and filtering based on different ages of computer users. You can do high security and harsh filtering for children, but when you log in you can set the system to not filter anything.",
        "Also remember that by installing this type of software on your computer, you could also restrict children's access to legitimate sites. This is especially true when you rely on keywords (like “sex”) to block. Some of these keywords appear in legitimate news and information, so it's best to experiment with different settings by configuring the control filters.",
        "Installing filtering software is no guarantee that your children will be safe from inappropriate content on the internet. Every day floating windows appear, so it is important to keep your program up to date. Also, be informed about how your Internet is working, so you can check the sites visited by your family (use the “History” feature to display the list of sites visited by your browser).",
        "Explaining the dangers that exist on the Internet and supervising your children when they are on the Internet remain the best ways to protect them.",
    ]   

  return (
    <>
    <Navbar />
    <div className='legal_page'>
    <div className="legal_container bg-light-grey py-8 px-6" style={index==="privacy"||"terms"?{width: "900px", color: "#fff"}: {color: "#fff"}}>
      <div className="mb-20">
        <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
            <h3 className="text-2xl sm:text-5xl leading-none font-bold">
             
            </h3>
        </div>
        {
           index==="compliance"?
          <> 
            <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                    Our Policies
                </h3>
            </div>
            <p style={{fontWeight: "600"}}>Duty to keep records in accordance with 18 USC 2257</p>
            <p style={{marginTop: "20px"}}>In compliance with the Federal Labeling and Record-Keeping Law (also known as 18 USC 2257), all models located within our domain were 18 years of age or older during the time of photography. All models' proof of age is held by the custodian of records, which is listed below, organized by producer. All content and images are in full compliance with the requirements of 18 USC 2257 and associated regulations.</p>
            <p style={{marginTop: "20px"}}>Pursuant to 18 USC § 2257 and its implementing regulations, all records required to be maintained are maintained by the following person:</p>
            <p style={{marginTop: "20px"}}>
                Custodian of Records<br/>
                Confirm ID, Inc.<br/>
                1615 S. Congress Avenue, Suite 103<br/>
                Delray Beach , FL 33445, USA<br/>
            </p>
            <p style={{marginTop: "20px"}}>The content of this site is reserved for an adult audience. Members and users have contractually declared to be 18 years of age or older at the time of photography.</p>
           </>:null
        }
        {
            index==="protect_kids"?
            <>
                <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                        Our Policies
                    </h3>
                </div>
                <p style={{fontWeight: "600"}}>Protect your children: keep them away from adult sites</p>
                {
                    protectKid.map(d => {
                        return(
                            <p style={{marginTop: "10px"}}>{d}</p>
                        )
                    })
                }
                <p style={{marginTop: "20px"}}>Here are some sites where you will find parental control software:</p>
                <p>CyberPatrol</p>
                <a href='http://www.cyberpatrol.com'>http://www.cyberpatrol.com</a>
                <p style={{marginTop: "20px"}}>Safety Surf</p>
                <a href='http://www.cyberpatrol.com'>http://www.safekids.com/</a>
                <p style={{marginTop: "20px"}}>Sites providing reliable information regarding safety on the net; for both children and adults:</p>
                <p>GetNetWise.org:</p>
                <a href='http://www.cyberpatrol.com'>http://www.getnetwise.org/</a>
                <p style={{marginTop: "20px"}}>RestrictedToAdults.org:</p>
                <a href='http://www.cyberpatrol.com'>http://rtalabel.org/</a>
            </>
            :null
        }
        {
            index==="dating_safety"?
            <>
                <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                        Our Policies
                    </h3>
                </div>
                <p style={{fontWeight: "600"}}>Please remember that:</p>
                <ol style={{marginTop: "20px", listStyle: "number", marginLeft: "20px"}}>
                    <li>Anyone capable of identity theft can falsify a dating ad.</li>
                    <li>There is no substitute for caution when communicating with a stranger who wants to meet you.</li>
                    <li>You should never include your last name, email address, home address, telephone number, place of work or any other identifying information in your Internet profile or in your first emails. Stop communicating with anyone who insists on personal or financial information or who tries to trick you into revealing it.</li>
                    <li>If you choose to have a one-on-one meeting with another member, you must always inform a family member or significant other of the meeting location and time of your return. Never accept someone to pick you up from your home. Always bring your own transportation and request to meet in a busy public place.</li>
                    <li>Swinxter does not do criminal background investigations.</li>
                </ol>
            </>
            :null
        }
        {
            index==="report"?
            <>
                <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                        Report abuse or sexual adverts
                    </h3>
                </div>
                <p>Under its Terms of Service , Swinxter prohibits its members from engaging in illegal acts such as prostitution, sex trafficking, and endangerment. Additionally, Swinxter prohibits its advertising providers from sending commercial emails and using other promotional methods that may violate applicable law and/or be inappropriate (e.g. general purpose sexually explicit material or website not intended for adults). If you are aware of any of the above activities, please contact us immediately using the form below so that we can investigate it and take further action, if appropriate. THANKS.</p>
                <select name="" id="" style={{backgroundColor: "#2A2D37", padding: "10px", marginTop: "40px", outline: "1px solid #777"}}>
                    <option value="">Abuse</option>
                    <option value="">Sexually explicit advertisements</option>
                    <option value="">Prostitution, Sex Trafficking and Endangerment</option>
                </select><br></br>
                <div>
                    <textarea style={{marginTop: "30px", padding: "10px", width: "413px", backgroundColor: "#2A2D37", height: "300px", outline: "1px solid #777"}}placeholder='Provide the details'/>
                </div>
                <button style={{padding: "8px 20px", background: "linear-gradient(46deg, #F79220 55.15%, #F94A2B 82%)", marginTop: "20px", width: "413px"}}>Report</button>
            </>
            :null
        }
        {
            index==="privacy"?
            <>
                <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                        Swinxter INC Privacy Policy
                    </h3>
                </div>
                <p style={{marginBottom: "20px"}}>At Swinxter, safeguarding your privacy is of utmost importance to us. This Privacy Policy governs how we collect, use, and handle your personal information when you interact with our website, https://www.swinxter.com/ (the "Website" or "Site"), and utilize the Facilities provided on our Website. Your use of the Site is subject to our Terms and Conditions of Use ("Terms"). The terms "you" and "your" encompass all visitors to the Website, including both casual Visitors who have limited access to the Facilities and registered Members, including new members, paid members, and VIP members (referred to collectively as "Members" unless otherwise specified). Throughout this Policy, "Swinxter," "we," and "us" refer to Swinxter, INC. For any capitalized term not explicitly defined in this Privacy Policy, please refer to the Terms for clarification.</p>
               {
                privacy.map(d => (
                    <>
                    <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px"}}>{d.title}</h4>
                    <p>{d.text1}</p>
                    <p style={{marginBottom: "20px", marginTop: "10px"}}>{d.text2}</p>
                    </>
                ))
               }
               <p>SafeTeens: <a href='http://www.safeteens.com' target='_blank'>http://www.safeteens.com</a></p>
               <p>Federal Trade Commission (FTC) Privacy Initiatives: <a href='http://www.ftc.gov/privacy/index.html' target='_blank'>http://www.ftc.gov/privacy/index.html</a></p>
               <p style={{margin: "5px 0"}}>FTC Children's Online Privacy Protection Act (COPPA) Resources:</p>
               <a href='http://www.ftc.gov/privacy/privacyinitiatives/childrens_educ.html' target='_blank'>http://www.ftc.gov/privacy/privacyinitiatives/childrens_educ.html</a><br></br>
               <a href='http://www.ftc.gov/bcp/conline/edcams/kidzprivacy/index.html'>http://www.ftc.gov/bcp/conline/edcams/kidzprivacy/index.html</a>
               <p>WiredSafety - Internet Safety for Teens: <a href='http://www.wiredsafety.org/internet101/blogs.html'>http://www.wiredsafety.org/internet101/blogs.html</a></p>
               <p>NetSmartz - Internet Safety for Teens: <a href='http://www.netsmartz.org/netteens.htm'>http://www.netsmartz.org/netteens.htm</a></p>
               <p>i-SAFE - Internet Safety Tips: <a href='http://www.isafe.org/channels/sub.php?ch=op&sub_id=media_tips'>http://www.isafe.org/channels/sub.php?ch=op&sub_id=media_tips</a></p>
               <p style={{margin: "10px 0"}}>By accessing these resources, you can stay informed about best practices for protecting your privacy and security online. If you have any specific questions or concerns related to our Privacy Policy or any other matter, please feel free to contact us at admin@swinxter.com. Your safety and privacy are of utmost importance to us, and we are committed to providing a secure and enjoyable experience on our Site.</p>
               <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px"}}>13. Contact Us</h4>
               <p>If you have any questions about this Privacy Policy, the practices of this Site, or your dealings with this Website, please contact us via email at admin@swinxter.com or certified mail at:</p>
               <p style={{marginTop: "10px"}}>
                SWINXTER INC <br/>
                119 S Palmetto Ave Daytona Beach <br/>
                Florida 32114 <br/>
                United States <br/>
               </p>
               <p style={{marginTop: "30px"}}>This Privacy Policy was last updated on September 4, 2023.</p>
               <p style={{marginTop: "10px", color: "#777"}}>© 2023 Swinxter, INC. All Rights Reserved</p>
            </>
            :null
        }
        {
            index==="terms"?
            <>
                 <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                        Terms of Use
                    </h3>
                </div>
                <p>Welcome to the SWINXTER website, located at "https://www.swinxter.com/" (referred to as the "Website" or "Site"). Swinxter, Inc. ("Swinxter," "we," or "us") provides this Website to you. To ensure a clear understanding of your relationship with us and assist you in using our Website and accessing its associated facilities, we have created the following documents: (i) Terms and Conditions of Use (referred to as "Terms"), and (ii) Privacy Policy. Our Privacy Policy outlines how we handle the information you provide to us through the Site, and our Terms govern your use of our Site. These Terms and Privacy Policy apply to all visitors to the Website, including casual visitors who do not register for a username and password, as well as registered members who create Profiles and participate in our Facilities. This includes Free Members, Paid Members, and VIP Members. </p>
                <p>We kindly request that you carefully read and review this document before accessing the Site or registering as a Member. By accessing the Site or registering as a Member, you agree to be bound by the Terms and Conditions set forth below, including the resolution of disputes through arbitration. If you do not wish to be bound by these Terms and Conditions, we kindly ask you not to access our Site. </p>
                <p style={{marginBottom: "20px"}}>Thank you for considering our Terms and Conditions, and we hope you have a positive and enjoyable experience while using our Website.</p>
                {
                    terms.map(d => (
                        <>
                        <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px"}}>{d.title}</h4>
                        <p style={{marginBottom: "10px"}}>{d.text1}</p>
                        <ul>
                        {
                            d.pts?.map(pt => (
                                <li>{pt}</li>
                            ))
                        }
                        </ul>
                        <ul>
                        {
                            d.ptses?.map(pt => (
                                <li style={{marginTop: "10px"}}>{pt}</li>
                            ))   
                        }
                        <p style={{marginTop: "10px", marginBottom: "10px"}}>{d.text2}</p>
                        </ul>
                        </>
                    ))
                }
                <p style={{marginTop: "10px"}}>
                SWINXTER INC <br/>
                119 S Palmetto Ave Daytona Beach <br/>
                Florida 32114 <br/>
                United States <br/>
               </p>
               <p style={{marginTop: "30px"}}>This Privacy Policy was last updated on September 4, 2023.</p>
               <p style={{marginTop: "10px", color: "#777"}}>© 2023 Swinxter, INC. All Rights Reserved</p>
            </>
            :null
        }
        {
            index === "refund"?
            <>
                <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                    <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                      SWINXTER Inc Refund Policy
                    </h3>
                </div>
                <p>Effective Date: 12/19/2023 </p>
                <p style={{marginTop: "10px", marginBottom: "10px"}}>Thank you for choosing Swinxter. We appreciate your commitment to our community. Please review our refund policy carefully before subscribing to our services.</p>
                <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px"}}>Refund Policy:</h4>
                <p>SWINXTER Inc does not offer any refunds for membership fees paid through our website. All membership sales are final.</p>
                <p style={{marginBottom: "10px"}}>Reasons for our No Refund Policy:</p>
                <p style={{marginBottom: "5px"}}><span style={{fontWeight: "600"}}>1. Membership Access: </span>Upon subscription, members gain immediate access to premium content and benefits. Once access is granted, it cannot be revoked, making it impractical to provide refunds.</p>
                <p style={{marginBottom: "5px"}}><span style={{fontWeight: "600"}}>2. Intangible Nature: </span>Our membership benefits are intangible, and the value is realized upon activation. Therefore, there is no physical product to return.</p>
                <p style={{marginBottom: "5px"}}><span style={{fontWeight: "600"}}>3. Administrative Costs: </span>SWINXTER Inc incurs administrative costs for processing payments, providing member support, and maintaining membership features. These costs are not recoverable in the event of a refund.</p>
                <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px", marginTop: "10px"}}>Exceptions</h4>
                <p>While SWINXTER Inc generally does not offer refunds for memberships, we understand that exceptional circumstances may arise. In such cases, we will review refund requests on a case-by-case basis and may consider offering refunds at our discretion.</p>
                <h4 style={{fontWeight: "600", color: "orange", marginBottom: "5px", marginTop: "10px"}}>Contact Infomation</h4>
                <p>If you have any questions or concerns about our membership refund policy, please contact our support team at admin@swinxter.com.</p>
                <p style={{marginTop: "10px"}}>Changes to Refund Policy:</p>
                <p>SWINXTER Inc reserves the right to amend or update this refund policy at any time without prior notice. The revised policy will be effective immediately upon posting on our website.</p>
                <p style={{marginTop: "10px"}}>By subscribing to our membership services, you acknowledge that you have read and agree to the terms of this refund policy.</p>
                <p style={{marginTop: "20px"}}>Thank you for being a valued member of SWINXTER Inc</p>
                <p>Sincerly,</p>
                <p style={{marginTop: "10px"}}>
                SWINXTER INC <br/>
                119 S Palmetto Ave Daytona Beach <br/>
                Florida 32114 <br/>
                United States <br/>
               </p>
               <p style={{marginTop: "30px"}}>This Privacy Policy was last updated on September 4, 2023.</p>
               <p style={{marginTop: "10px", color: "#777"}}>© 2023 Swinxter, INC. All Rights Reserved</p>
            </>
            :null
        }
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default LegalPage