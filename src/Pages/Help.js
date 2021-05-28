import React from 'react'

import createImg from '../Images/help_Create.png'
import invitatonImg from '../Images/invitation.png'
import invitationModalImg from '../Images/invitation_modal.png'
import searchImg from '../Images/searchRoom.png'
import searchModalImg from '../Images/searchRoom_modal.png'
import help_listRooms from '../Images/help_listRooms.png'
import room1 from '../Images/room1.png'
import room2 from '../Images/room2.png'
import room3 from '../Images/room3.png'
import room4 from '../Images/room4.png'
import room5 from '../Images/room5.png'
import room6 from '../Images/room6.png'
import room7 from '../Images/room7.png'
import depositImg from '../Images/depositImg.png'
import lateralMenu from '../Images/lateralMenu.png'
import help_withdraw from '../Images/help_withdraw.png'
import help_sendToUser from '../Images/help_sendToUser.png'

import './Styles/Help.css'

export const Help = () => {
    return <div className='balance-container'>
            <h1 className='help_h1'>Instructions</h1>
            <div>
                <p>
                To begin the algorithm of 2wanted,  first:  you need to enter a “room”, in which you create from the start in the option “Create Room”. In the main menu, add a unique name for the value of 0.00005 BTC with a previously loaded wallet.   
                    <a className='help_a' href='#walletInstruction'> Click Here for instructions on the deposit and the withdraw from the wallet.</a>
                </p>
                <div className='help_imgContainer'> <img className='help_create' src={createImg} alt="create"/> </div>
                <p>You can also join a “room” with an invitation received from the tab of notifications for users that are participating in a room already. </p>
                <div className='help_imgContainer'>
                    <img className='help_img help_medium' src={invitatonImg} alt=""/>
                    <img className='help_img help_medium' src={invitationModalImg} alt=""/>
                </div>
                <p>or you can enter a room previously existent through another. Taking into consideration that the room  is created public, you can  search for the name which will consider to specify the person created. The, enter through this method if you are going to enter like a user apart of the room. Or if you desire benefit a random user from the room.</p>
                <div className='help_imgContainer '>
                    <img className='help_img help_medium' src={searchImg} alt=""/>
                    <img className='help_img help_medium' src={searchModalImg} alt=""/>
                </div>
                <p>
                    Through any method of entrance to a room you will have to pay the cost of value stipulated in it, which represents the only version  in which it will preform to win. <br></br><br></br>
                    After having entered in a room correctly, you can now visualize from the list of room active and enter to see you state.
                </p>
                <div className='help_imgContainer'>
                    <img className='help_listRoom' src={help_listRooms} alt=""/>
                </div>
                <p>
                    Once have entered the room, the objective will be to complete a structure of pyramidal limited with 4 levels. When you begin, you will always be the user that is ahead the pyramidal.The users active will represent with lighted yellow circles. The idea is to get to the third and fourth level, now that for each user active in the third level the pay will have a value of the 50% in that room. For every user active in the fourth level the pay will have a value of the 25% of that room. With only two users in the third level, there will be the recompenastion of the investment and it will add up to the 100%. The rest of the users will be a profit: having said that, users involved will have the option to win by doing the same as it will be shown in the continuing dynamic of profits. <br></br><br></br>
                    When begining, the user 1, will have the room empty like it is shown in the image, only having them being the only participants in the top.
                </p>
                <div className='help_imgContainer'>
                    <img src={room1} alt=""/>
                </div>
                <p>
                    To  begin to fill the room, invite user2 by clicking the + and writing the name of the user that you desire to invite. This user will receive an invitation in the tab of notifications to join. Then, they will have to pay the import of cost of the room: then join. This is how it will look:
                </p>
                <div className='help_imgContainer'>
                    <h4 className='img-h4'>View from user1</h4>
                    <img className='help_img' src={room2} alt=""/>
                    <h4 className='img-h4'>View from user2</h4>
                    <img className='help_img' src={room3} alt=""/>
                </div>
                <p>
                    Note that the user2 invite, will begin alone from the top to obtain as will a profit which will complete the process. But, from user1 already has its first member. When the user2 invites a new user, for example user3, it will look as shown in the images down below:
                </p>
                <div className='help_imgContainer'>
                    <h4 className='img-h4'>View from user1</h4>
                    <img className='help_img' src={room4} alt=""/>
                    <h4 className='img-h4'>View from user2</h4>
                    <img className='help_img' src={room5} alt=""/>
                </div>
                <div className='help_imgContainer'>
                    <h4>View from user3</h4>
                    <img src={room6} alt=""/>
                </div>
                <p>
                    After viewing the examples of the images: the objective is to look for two users that are interested in winning. They will do there job to refill the room in a way that you can begin to will in the third level. If every user does there job to look for two users for there room then this one will fill up on its own. If not, there is an option to fill it up on your own, by inviting all the users that you can to win. Meanwhile, you help them fill there rooms up.  <br></br><br></br>
                </p>
                <h5>Example of room with users in the third and fourth level:</h5>
                <div className='help_imgContainer'>
                    <img src={room7} alt=""/>
                </div>
                <p>
                    In this room, with the value of example 1BTC  you can observe that it has 3 users in the third level and two in the fourth level. Each user in the third line produces 50% of the value in the room of profits. Now that the value in the room is 1BTC. Each one is producing, 0.5BTC the three current users in the third level will save up 1.5BTC. The users in the fourth level will produce a 25% value in the room for each one. The two current users in the fourth level will be producing 0.25BTC each. Adding up to, 0.5BTC en the fourth line. Adding up everything produced currently for every third and fourth level; it will be generating 2 BTC of profit. Thus, in one room the only investment was of 1BTC and there will still be numerous spots remaining to fill.   <br></br><br></br>
                    One room full of  2wanted returns a 800% of value, of the investment. In the table to the right, you can see the details of the profit and information of the room. As well as, the take away of the profits from the wallet at any moment. After have filled the room, this one will desapear from your currently active room. You can create and join any room  at the same time: taking advantage of this algorithm positioned for you. <br></br><br></br>
                </p>
            </div>
            <div id='walletInstruction'>
                <h1 className='help_h1'>Wallet Deposit and Withdrawal Instructions </h1><br></br>
                <div>
                    <h4>How To Deposit BTC in the Wallet of 2Wanted</h4>
                    <p>
                        The Bitcoin is the coin in which we manage all the deposits, withdraws and transfers between the users.  <br></br><br></br>
                        To deposit money into 2wanted you need to send Bitcoin (BTC) from an external wallet towards the your wallet in 2wanted. <br></br><br></br>
                        In the right side menu click on the option deposit. In which it will displace a window with a direction signed to your account of user. The code QP is with what you will be able to deposit to your wallet in 2wanted.  
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={depositImg} alt=""/>
                    </div>
                    <p>
                        The time of verification to the transfers of the external wallets en BTC to your account in 2wanted depend on various factors. View the following link:  <a className='help_a' href='https://es.cointelegraph.com/explained/how-long-does-a-cryptocurrency-transaction-take' rel='noreferrer' target='_blank'>https://es.cointelegraph.com/explained/how-long-does-a-cryptocurrency-transaction-take</a><br></br><br></br>
                    </p>
                    <h4>How to Remove BTC from Wallet of 2Wanted towards the External Wallets </h4>
                    <p>
                        In the right side menu click on the option Withdraw which will them displace a format in which you need to write in the direction that will receive the withdraw the amount. In this way, you will have information automatically from the fee of discount: and the total that the wallet will receive.
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={help_withdraw} alt=""/>
                    </div>
                    <h4>Transfer BTC between users of 2Wanted (Free with no commissions)</h4>
                    <p>
                        In the right side menu click on the option “Send BTC to 2Wanted User (free)”. At this time this will displace a format where you should write the name of the user, the amount. Then, click on send. <br></br>
                        The transfers between the users are free.
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={help_sendToUser} alt=""/>
                    </div>
                </div>
            </div>
        </div>
}