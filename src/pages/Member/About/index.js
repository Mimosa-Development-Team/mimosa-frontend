/* eslint-disable no-unused-vars */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

import { ReactComponent as Logo } from 'assets/images/login/logo-icon-only.svg'
import ElifeLogo from 'assets/images/elife.svg'

import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'

import { ROUTES, PRIVATE_ROUTES } from '../constants'
import styles from './styles.module.scss'

const About = ({ user, hasSession }) => {
  return (
    <PageWrapper
      showNav
      links={hasSession ? PRIVATE_ROUTES : ROUTES}
      user={user}
      hasSession={hasSession}
    >
      <PageContentWrapper>
        <Grid container spacing={4} className={styles.container}>
          <Grid item xs={12} sm={3} className={styles.summary}>
            <Logo />
            <p>
              Mimosa is a platform for open collaboration in
              science. Read the Mimosa Manifesto{' '}
              <Link
                className={`${styles.Linkstyle}`}
                target="_blank"
                href="https://drive.google.com/file/d/1A8FXj3euP9u8YCN1KZNAX-WkcM8Bdo_P/view"
              >
                [link]
              </Link>{' '}
              to see how an ideal version of Mimosa would be
              after after release. Mimosa is built on the
              principles of Open Access, Open Source, Micro
              Publication, Incremental improvement through
              feedback, Virtuous incentives, Reciprocity,
              Reciprocity, Inclusivity, Professionalisation of
              roles, Salient deprecation, and Replication.
              <span className={styles.author}>
                Project by: Lana Sinapayen
              </span>
            </p>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h1" className="mb-15">
              About Mimosa
            </Typography>

            <Typography
              className={`${styles.h5style}`}
              variant="span"
            >
              Who we are
            </Typography>

            <Paper elevation={0} className={styles.contentPaper}>
              <p>
                Mimosa is a project by Lana Sinapayen, associate
                researcher at Sony Computer Science Laboratories
                Kyoto.
              </p>

              <p>
                Invision design prototype:{' '}
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href="https://bit.ly/3t4RJNk"
                >
                  https://bit.ly/3t4RJNk
                </Link>
                <br />
                Google doc for comments:{' '}
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href="https://bit.ly/3cgEB0K"
                >
                  https://bit.ly/3cgEB0K
                </Link>
                <br />
                TL;DR in 7 slides:{' '}
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href="https://bit.ly/30wXwi8"
                >
                  https://bit.ly/30wXwi8
                </Link>
              </p>

              <span className={`${styles.h4style}`}>
                SCIENCE IS A DEBATE
              </span>

              <p>
                Debates happen where there is wiggle room for
                interpretation. There is no debate when all
                parties agree, or when all parties know why they
                disagree.
              </p>

              <p>
                <strong>
                  Scientific debates can be settled by agreeing
                  on an experimental protocol.
                </strong>{' '}
                Good protocols identify wiggle room and
                preemptively get rid of it, by fixing the
                interpretation of experimental results before the
                experiment proceeds. “Are doctors transmitting
                deadly illnesses from cadavers to birthing
                mothers? Have some doctors wash their hands after
                autopsies. Let us agree that if their patients
                have better survival rates than usual, it means
                that infections travel on the hands of doctors
                (Carter 1985).”
              </p>

              <p>
                Experimental results might tell you which way the
                settlement goes, but ideally the debate itself
                ends with the protocol. From this point of view,
                Science is the art of defining convincing
                protocols: scientific papers are more interesting
                and more rigorous when they are written by two
                people who start out genuinely disagreeing.
              </p>

              <p>
                Mimosa is an attempt at harnessing both support
                and disagreement in science into a productive,
                collaborative format. Mimosa also tries to
                address many of the{' '}
                <Link
                  className={`${styles.underlined}`}
                  target="_blank"
                  href="https://www.theguardian.com/higher-education-network/2018/may/21/scientists-access-journals-researcher-article"
                >
                  numerous recognised issues
                </Link>{' '}
                within the current format for sharing science,
                born at a different time and for{' '}
                <Link
                  className={`${styles.underlined}`}
                  target="_blank"
                  href="https://www.theguardian.com/science/2017/jun/27/profitable-business-scientific-publishing-bad-for-science"
                >
                  the wrong reasons.
                </Link>{' '}
              </p>

              <p>
                When it first started, Wikipedia was greeted with
                suspicion. It is now a major platform for finding
                information, used by all demographics. Wikipedia
                has a famous rule:{' '}
                <Link
                  className={`${styles.underlined}`}
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/Wikipedia:No_original_research"
                >
                  “No original research”
                </Link>
                .
              </p>

              <p>
                <strong>
                  Mimosa aspires to be that free,
                  open-collaborative online platform created and
                  maintained by a community of volunteer
                  contributors, dedicated to original research.
                </strong>
              </p>
            </Paper>

            <Typography
              className={`${styles.h6style}`}
              variant="span"
            >
              Media and Honors
            </Typography>

            <div className={styles.mediaSection}>
              <div className={styles.partnerLogo}>
                <img src={ElifeLogo} alt="elife" />
                <span>
                  eLife Innovation Leaders 2020 Participant
                </span>
              </div>
              <div className={styles.iclr}>ICLR 2021</div>
            </div>

            <Typography
              className={`${styles.h6style}`}
              variant="span"
            >
              Special Thanks
            </Typography>

            <Typography>
              A. Masumori, N. Maruyama, E. A. O. Diallo, M.
              Morrison, K. Kashiwa, Method IT
            </Typography>

            <Paper elevation={0} className={styles.contactPaper}>
              <Typography
                variant="span"
                className={`${styles.h2style}`}
              >
                Get in touch with us
              </Typography>

              <Typography className="mb-10">
                Contact{' '}
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href="mailto:hello@openmimosa.org"
                >
                  hello@openmimosa.org
                </Link>
              </Typography>

              <Typography className="mb-5">
                Contribute to Mimosa&apos;s open source code
              </Typography>

              <Typography className="mb-20">
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href="https://github.com/Mimosa-Development-Team"
                >
                  https://github.com/mimosa
                </Link>
              </Typography>

              <Typography
                variant="span"
                className={`${styles.title}`}
              >
                Read the blog
              </Typography>

              <Typography className="mb-20">
                <Link
                  className={`${styles.Linkstyle}`}
                  target="_blank"
                  href=" https://openmimosablog.wordpress.com/"
                >
                  https://openmimosablog.wordpress.com/
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </PageContentWrapper>
    </PageWrapper>
  )
}

About.propTypes = {}

export default About
