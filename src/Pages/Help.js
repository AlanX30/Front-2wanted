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
                    Para iniciar el algoritmo de 2wanted primeramente se debe ingresar a una  “sala”, la cual se puede crear desde cero en la opción “Create Room” en el menú principal, colocando un nombre único y un valor mínimo de 0.00005 BTC, con una billetera cargada previamente.  
                    <a className='help_a' href='#walletInstruction'> Click Aquí para instrucciones de deposito y retiro en la billetera.</a>
                </p>
                <div className='help_imgContainer'> <img className='help_create' src={createImg} alt="create"/> </div>
                <p>También puede unirse a una sala con una invitación recibida en la bandeja de notificaciones por usuarios pertenecientes a una sala ya creada anteriormente.</p>
                <div className='help_imgContainer'>
                    <img className='help_img help_medium' src={invitatonImg} alt=""/>
                    <img className='help_img help_medium' src={invitationModalImg} alt=""/>
                </div>
                <p>o ingresar a una sala creada con anterioridad por otra persona, ya que toda sala creada quedará publica, y puede ingresar a ella por su nombre a través del buscador, con este método se le pedirá especificar si va a entrar como referido de un usuario perteneciente a la sala o desea beneficiar a un usuario aleatorio en ella.</p>
                <div className='help_imgContainer '>
                    <img className='help_img help_medium' src={searchImg} alt=""/>
                    <img className='help_img help_medium' src={searchModalImg} alt=""/>
                </div>
                <p>
                    Por cualquier método de ingreso a una sala se tendrá que pagar el coste de valor estipulado en ella la cual representa la única inversión que se realizará para ganar. <br></br><br></br>
                    Después de haber ingresado a una sala correctamente ya podrá visualizarla desde la lista de salas activas e ingresar para ver su estado.
                </p>
                <div className='help_imgContainer'>
                    <img className='help_listRoom' src={help_listRooms} alt=""/>
                </div>
                <p>
                    Una vez dentro de la sala el objetivo será completar una estructura piramidal limitada con 4 niveles, al comenzar serás siempre el usuario que encabeza dicha pirámide, los usuarios activos se representan con círculos amarillos encendidos, la idea es llegar al tercer y cuarto nivel, ya que por cada usuario activo en tercer nivel se pagara un valor del 50% del valor de la sala, y por cada usuario activo en el cuarto nivel se pagara un valor de 25%  del valor de la sala, con solo dos usuarios en el tercer nivel ya se recuperaría la inversión ya que sumaría un 100% y el resto de usuarios serian ganancia, dichos usuarios ingresados tienen la opción de ganar haciendo lo mismo como se mostrara a continuación con la siguiente dinámica de ingresos. <br></br><br></br>
                    Al empezar este user1 tendrá su sala vacía como se muestra en la imagen, solo estando este como participante en la cima
                </p>
                <div className='help_imgContainer'>
                    <img src={room1} alt=""/>
                </div>
                <p>
                    Para empezar a llenar su sala, invitará a un user2 haciendo Click en el botón + y escribiendo el nombre de usuario al que se desea invitar, este usuario recibirá una invitación en su bandeja de notificaciones para unirse y tendrá que pagar el importe del costo de la sala, luego de unirse se vería de esta manera
                </p>
                <div className='help_imgContainer'>
                    <img className='help_img' src={room2} alt=""/>
                    <img className='help_img' src={room3} alt=""/>
                </div>
                <p>
                    Nótese que el user2 invitado empieza solo desde la cima para obtener el también sus ganancias completando el proceso, pero desde el user1 ya tiene su primer integrante, cuando el user2 invite un nuevo usuario que en este ejemplo llamaremos user3 se vería de esta manera
                </p>
                <div className='help_imgContainer'>
                    <img className='help_img' src={room4} alt=""/>
                    <img className='help_img' src={room5} alt=""/>
                </div>
                <div className='help_imgContainer'>
                    <img src={room6} alt=""/>
                </div>
                <p>
                    Viendo los ejemplos, El objetivo es buscar a 2 usuarios que estén interesados en ganar, que ellos hagan su trabajo, para rellenar tu sala de manera que puedas empezar a ganar en el tercer nivel, si cada usuario hace su trabajo de buscar dos usuarios para su sala, esta se llenara sola, sino esta la opción de llenarla tu mismo invitando todas las personas que puedas para ganar y a la ves los estas ayudando a ellos a llenar su sala. <br></br><br></br>
                </p>
                <h5>Ejemplo de sala con usuarios en tercer y cuarto nivel:</h5>
                <div className='help_imgContainer'>
                    <img src={room7} alt=""/>
                </div>
                <p>
                    En esta sala con un valor de ejemplo de 1 BTC se puede observar que lleva 3 usuarios en el tercer nivel y 2 en el cuarto nivel, cada usuario en tercera línea producirá 50% del valor de la sala en ganancia, ya que el valor de sala es de 1BTC, cada uno esta produciendo 0.5 BTC, los 3 usuarios actuales en tercer nivel sumarian 1.5 BTC, los usuarios en el cuarto nivel producen un 25% del valor de la sala por cada uno, los dos usuarios actuales en cuarto nivel estarían produciendo 0.25 BTC cada uno, sumando 0.5 BTC en cuarta línea. Sumando lo producido actualmente por tercer y cuarto nivel se estaría generando 2 BTC de ganancia, en una sala donde su única inversión fue de 1 BTC y todavía quedan muchos puestos por llenar. <br></br><br></br>
                    Una sala llena de 2Wanted devuelve un 800% del valor de la inversión, en la tabla derecha podrás ver los detalles de ganancias e información de la sala y retirar ganancias a la billetera en cualquier momento. Luego de haber llenado la sala, esta desaparecerá de sus salas activas. Puedes crear y unirte a cuantas salas quieras al mismo tiempo y aprovechar este algoritmo fijo puesto para ti… <br></br><br></br>
                </p>
            </div>
            <div id='walletInstruction'>
                <h1 className='help_h1'>Instrucciones de deposito y retiro de la billetra 2Wanted</h1><br></br>
                <div>
                    <h4>Depositar btc en la billetera de 2wanted</h4>
                    <p>
                        El Bitcoin es la moneda es con que manejamos todos los depósitos, retiros y transferencias entre usuarios. <br></br><br></br>
                        Para depositar dinero en 2WANTED deberás enviar Bitcoin (BTC) desde una billetera externa hacia tu billetera en 2Wanted <br></br><br></br>
                        Oprimiendo Click en el icono se desplegará el menú lateral donde harás click en el botón deposit, el cual desplegara una ventana con una dirección asignada a tu cuenta de usuario y el código QR con los que podrás depositar a tu billetera en 2WANTED. 
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={depositImg} alt=""/>
                    </div>
                    <p>
                        Los tiempos en verificarse las transferencias de billeteras externas en BTC a tu cuenta 2Wanted dependen de varios factores, ver link <a className='help_a' href='https://es.cointelegraph.com/explained/how-long-does-a-cryptocurrency-transaction-take' rel='noreferrer' target='_blank'>https://es.cointelegraph.com/explained/how-long-does-a-cryptocurrency-transaction-take</a><br></br><br></br>
                    </p>
                    <h4>Retirar btc de la billetera de 2wanted hacia billeteras externas</h4>
                    <p>
                        Para el retiro hacia billeteras externas, hacer click en el botón se desplegará el menú lateral donde harás click en el botón retirar el cual desplegará un formato donde deberás redactar la dirección que va a recibir el retiro, el monto y a su vez tendrás información automática del fee de descuento y el total que recibiría la billetera receptora.
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={help_withdraw} alt=""/>
                    </div>
                    <h4>Transferir btc entre usuarios de 2wanted(Gratis sin comisiones)</h4>
                    <p>
                        Para transferir BTC entre usuarios dar click en el botón se desplegará el menú lateral donde harás click en el botón Send BTC to 2Wanted User (free) el cual desplegará un formato donde deberás redactar el nombre de usuario, el monto y click en enviar. <br></br>
                        Las transferencias entre usuarios son gratuitas.
                    </p>
                    <div className='help_imgContainer'>
                        <img className='help_img help_medium' src={lateralMenu} alt=""/>
                        <img className='help_img help_medium' src={help_sendToUser} alt=""/>
                    </div>
                </div>
            </div>
        </div>
}