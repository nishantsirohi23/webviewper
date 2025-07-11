import Image from 'next/image';
import raft_footer_logo from '../../../public/footer_logo_perpenny.png';
import qr_code from '../../../public/svgs/qr_code.svg';
import ic_google_playstore from '../../../public/svgs/ic_google_playstore.svg';
import ic_baseline_apple from '../../../public/svgs/ic_baseline_apple.svg';
import ic_chevron_down from '../../../public/svgs/ic_chevron_down.svg';
import ic_copyright from '../../../public/svgs/ic_copyright.svg';

const linksArr = [
  {
    title: 'About us',
    links: ['Our Company', 'Careers', 'Press kits'],
  },
  {
    title: 'Partner Onboarding',
    links: ['Become a partner', 'Partner login'],
   
  },
  {
    title: 'Need help?',
    links: ['Contact us', 'FAQ'],
  },
];

import {
  Wrapper,
  Inner,
  FooterLogo,
  FooterMainContent,
  FooterMiddle,
  QRContainer,
  QRImageCtn,
  TextCtn,
  IconCtn,
  FooterNavigation,
  GridColumn,
  LinksContainer,
  FooterBottom,
  Translator,
  CopyRight,
} from './styles';

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <FooterLogo>
        <div className="relative w-64 h-24 md:w-56 md:h-20 sm:w-48 sm:h-16">
  <Image
    src={raft_footer_logo}
    alt="raft_footer_logo"
    fill
    className="object-contain"
    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
  />
</div>


        </FooterLogo>
        <FooterMainContent>
          <FooterMiddle>
            <QRContainer>
              <QRImageCtn>
                <Image src={qr_code} alt="qr_code" />
              </QRImageCtn>
              <TextCtn>
                <p>Scan to download App on the Playstore and Appstore.</p>
                <IconCtn>
                  <Image src={ic_google_playstore} alt="playstore icon" />
                  <Image src={ic_baseline_apple} alt="apple icon" />
                </IconCtn>
              </TextCtn>
            </QRContainer>
            <FooterNavigation>
              {linksArr.map((l, i) => (
                <GridColumn key={i}>
                  <h3>{l.title}</h3>
                  <LinksContainer>
                    {l.links.map((link, i) => (
                      <li key={i}>{link}</li>
                    ))}
                  </LinksContainer>
                </GridColumn>
              ))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <Translator>
              <h3>English (United Kingdom)</h3>
              <Image src={ic_chevron_down} alt="chevron down" />
            </Translator>
            <CopyRight>
              <Image src={ic_copyright} alt="copyright svg" />
              Perpenny Works LLP.
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>
      </Inner>
    </Wrapper>
  );
};

export default Footer;
