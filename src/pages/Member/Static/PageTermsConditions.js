import React from 'react'
import Typography from '@material-ui/core/Typography'
import CustomScrollbar from 'components/CustomScrollbar'
import styles from './styles.module.scss'

const PageTermsConditions = () => {
  return (
    <div className={`${styles.staticWrapper} ${styles.tc}`}>
      <CustomScrollbar>
        <Typography variant="h1" className="mb-20">
          Terms and Conditions
        </Typography>

        <p className="mb-20">Introduction</p>
        <p className="mb-20">
          By continuing to browse openmimosa.org you are agreeing
          to comply with the following terms and conditions of
          use. If you disagree with any part of these Terms,
          please do not use Mimosa.
        </p>
        <p className="mb-20">Using Mimosa</p>
        <p>
          In order to use Mimosa you must be over 13 years old,
          or be chaperoned by an adult of legal age in your
          country of residence.
        </p>
        <p>By using Mimosa, you agree that you will not</p>
        <p>
          Break local laws and regulations applicable in your
          country of residence
        </p>
        <p>
          Harass or threaten other users (see our harassment
          policy)
        </p>
        <p>Post defamatory or insulting content</p>
        <p>Voluntarily post misleading content</p>
        <p className="mb-15">
          Assume the identity of someone else
        </p>

        <p className="mb-40">
          Content that is deemed to breach these rules will be
          removed from the platform. Users that are judged to be
          nefarious to the platform will see their accounts
          deactivated. If you are experiencing harassment from
          another user, contact us at hello@openmimosa.org
        </p>

        <p className="mb-20">Postings and User Content</p>
        <p>
          When using contents from other users or persons not
          using Mimosa, you must credit the authors of that
          content. Mimosa is intended for scholarly use, so in
          particular, quoting, citing, and summarizing research
          papers is encouraged within the limits of fair use.
          However you may not post copyrighted contents without
          consent of, and attribution to the copyright holders
          beyond the limits of fair use.
        </p>
        <p className="mb-20">
          You may not attribute authorship to people who have not
          approved the contents of your contribution.
        </p>

        <p className="mb-20">Copyright and Licence</p>
        <p>
          Contents hosted on other platforms (for example,
          Figshare, Youtube, Arxiv) and linked in Mimosa is
          subject to the license specified on those third party
          platforms. Original contents posted publicly on Mimosa
          by its users is, by default and unless specified
          otherwise, under CC-BY 4.0 license
          (https://creativecommons.org
        </p>
        <p className="mb-20">
          The code of the Mimosa platform itself will be released
          under CC-BY at an ulterior date.
        </p>

        <p className="mb-20">
          Limitations and Exclusions of Liability
        </p>
        <p className="mb-15">
          Mimosa aims to help people work on unsolved scientific
          questions and share the knowledge created as a result.
          Mimosa strives to accurately represent the consensus
          about answers to these questions, a consensus that
          changes as new data and new analyses are contributed to
          the platform.
        </p>
        <p className="mb-40">
          However, as anyone can contribute to Mimosa, please
          keep in mind that the owner of the platform cannot
          guarantee the validity of the information published by
          its users, or the motives and conflict of interests of
          said users. Mimosa cannot replace a personal
          consultation with medical professionals, technical
          staff, etc. If you notice harmful or inaccurate
          information, please contact us at hello@openmimosa.org
        </p>
      </CustomScrollbar>
    </div>
  )
}

export default PageTermsConditions
