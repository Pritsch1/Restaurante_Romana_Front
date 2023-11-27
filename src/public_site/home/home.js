import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss'
import '../../unique/flex.scss';
import { links, photos } from '../links';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
    return (
        <div className="home">

            {/*New Section*/}
            {/* Intro and Products */}
            <div className="flex flexrow wrap home_swap">
                {/* Products */}
                <div className="home_divide home_carousel flex flex_x_center">
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <a href="#buffet">
                                <img className="home_imgsize" loading="lazy" src={photos.buffet} alt="Foto do Buffet do Restaurante" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#buffet">
                                    <h4 className="links home_contrast_link">Buffet</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <a href="#buffet">
                                <img className="home_imgsize" loading="lazy" src={photos.delivery} alt="Foto da Marmita Preparada Pelo Restaurante" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#buffet">
                                    <h4 className="links home_contrast_link">Entrega de Marmitas</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <a href="#bread">
                                <img className="home_imgsize" loading="lazy" src={photos.bread} alt="Foto Do Pão Funcional" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#bread">
                                    <h4 className="links home_contrast_link">P&#227;es Funcionais</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <a href="#catering">
                                <img className="home_imgsize" loading="lazy" src={photos.catering} alt="Foto das HotBox Fechadas" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#catering">
                                    <h4 className="links home_contrast_link">Refei&#231;&#227;o Coletiva</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <a href="#events">
                                <img className="home_imgsize" loading="lazy" src={photos.events} alt="Foto Casal na Entrada do Restaurante" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#events">
                                    <h4 className="links home_contrast_link">Eventos</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>
                        {/* Photo Pending */}
                        {/*<Carousel.Item interval={3000}>
                            <a href="#home_buffet">
                                <img className="home_imgsize" loading="lazy"src={photos.placebo} alt="placebo" />
                            </a>
                            <Carousel.Caption>
                                <a className="links" href="#home_buffet">
                                    <h4 className="links home_contrast_link">Buffet a Domic&#237;lio</h4>
                                </a>
                            </Carousel.Caption>
                        </Carousel.Item>*/}
                    </Carousel>
                </div>

                {/* Intro */}
                <div className="flex flex_y_center home_text_margins home_divide">
                    <div className="flex flexcol home_text_margins">
                        <h1 className="flex flex_x_center">Restaurante Romana</h1>
                        <h6>
                            Desde 1990 o Restaurante Romana trabalha com uma sele&#231;&#227;o de produtos n&#227;o industrializados
                            e temperos t&#237;picos da cozinha brasileira.
                        </h6>
                        <h6>
                            Com pitadas bem dosadas de sabor, sa&#250;de e amor,
                            o Restaurante Romana se torna a escolha certa para o almo&#231;o do dia a dia. Ah! E o pre&#231;o n&#227;o
                            &#233; salgado. Venha conhecer o Restaurante Romana.
                        </h6>
                    </div>
                </div>
            </div>

            {/*New Section*/}
            {/* Values, Ordering and Google Maps Api */}
            <div className="flex flexrow wrap home_black home_swap">

                {/* Google Maps Api */}
                <div className="home_divide home_set_iframe">
                    <iframe className="home_google_maps home_divide" title="Google_maps" loading="lazy" allowFullScreen src={links.google_maps_api_overview}></iframe>
                </div>

                {/* Ordering and Value */}
                <div id="buffet" className="home_text_margins flex flexcol flex_x_center flex_y_center home_divide">
                    {/* Value */}
                    <h2 className="flex flex_x_center">Buffet e Entrega</h2>
                    <div className="flex flexcol flex_x_center">
                        <div className="flex flex_x_center">
                            <a className="home_links home_bottom_15" href="/valores" rel="noopener noreferrer">
                                Valores
                            </a>
                        </div>
                    </div>
                    {/* Ordering */}
                    <div id="delivery" className="flex flexcol flex_x_center">
                        <h5>Realizamos entregas at&#233; 3km do restaurante.</h5>
                        <div className="flex flex_x_center home_top_15">
                            <a className="home_links" href={links.whatsapp_link_0150} rel="noopener noreferrer">
                                Pe&#231;a
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/*New Section*/}
            {/* Bread */}
            <div className="flex flexrow wrap home_white">
                <div id="bread" className="home_text_margins flex flexcol flex_x_center flex_y_center home_divide">
                    <h2>Padaria Romana</h2>
                    <div>
                        Conhe&#231;a nossa produ&#231;&#227;o de p&#227;es funcionais.
                    </div>
                    <div className="flex flex_x_center home_top_15">
                        <a className="home_links" href={links.whatsapp_link_0150} rel="noopener noreferrer">
                            Encomendar
                        </a>
                    </div>
                </div>
                <div className="home_divide home_carousel_2 flex flex_x_center">
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.bread} alt="Foto do Pão na Cesta" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.bread1} alt="Foto do Pão com Decoração" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.bread2} alt="Foto do Pão com os Ingredientes" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

            {/*New Section*/}
            {/* Catering */}
            <div className="flex flexrow wrap home_black home_swap">
                <div className="home_divide home_carousel_2 flex flex_x_center">
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.catering} alt="Foto das HotBox Fechadas" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.catering1} alt="Foto Das HotBox Abertas" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.catering2} alt="Foto Descarregando Comida" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.catering3} alt="Foto da Salada e Sobremesa" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.catering4} alt="Foto do Buffet Montado" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div id="catering" className="home_text_margins flex flexcol flex_x_center flex_y_center home_divide">
                    <h2>Refei&#231;&#245;es Coletivas</h2>
                    <div>
                        Atendemos sua empresa com o servi&#231;o de refei&#231;&#245;es transportadas.
                        Pe&#231;a uma cota&#231;&#227;o.
                    </div>
                    <div className="flex flex_x_center home_top_15">
                        <a className="home_links" href="/coletivas" rel="noopener noreferrer">
                            Cota&#231;&#227;o
                        </a>
                    </div>
                </div>
            </div>

            {/* Events info */}
            <div className="flex flexrow wrap home_white">
                <div id="events" className="home_text_margins flex flexcol flex_x_center flex_y_center home_divide">
                    <h2>Eventos</h2>
                    <div>
                        Oferecemos espa&#231;o para eventos com capacidade para 65 pessoas ou levamos o rango at&#233; seu local favorito
                        para comemorar.
                    </div>
                    <div className="flex flex_x_center home_top_15">
                        <a className="home_links" href={links.whatsapp_link_0150} rel="noopener noreferrer">
                            Confira!
                        </a>
                    </div>
                </div>
                <div className="home_divide home_carousel_2 flex flex_x_center">
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.events} alt="Foto Casal Na frente Do Restaurante" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.events1} alt="Foto do Deck" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.events2} alt="Foto Espaço interior" />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="home_imgsize" loading="lazy"src={photos.events3} alt="Foto do Deck 2" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

            {/* buffet info */}
            <div id="home_buffet" className="home_text_margins flex flexcol flex_x_center flex_y_center home_black">
                <h2>Buffet a Domic&#237;lio</h2>
                <div>
                    Seja festa de anivers&#225;rio, festa de fim de ano, aquele reencontro da turma da escola ou faculdade o
                    Restaurante Romana torna sua confraterniza&#231;&#227;o mais saborosa!
                </div>
                <div className="flex flex_x_center home_top_15">
                    <a className="home_links" href={links.whatsapp_link_0150} rel="noopener noreferrer">
                        Confira!
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Home;