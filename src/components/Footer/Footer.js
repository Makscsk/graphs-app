import React from 'react'
import styles from './Footer.module.scss'
import { Row, Col, Container } from 'react-bootstrap'
import { BsFillEnvelopeFill, BsBarChartFill } from 'react-icons/bs'
import { FaTwitter, FaGithub } from 'react-icons/fa'

export default function Footer(props) {
  return (
    <Container fluid style={{ backgroundColor: 'var(--dark)' }}>
      <Container className={styles.footer}>
        <Row>
          <Col xs={6} sm={{ span: 1, order: 1 }} lg={{ span: 3, order: 1 }}>
              {'Graps © 2026'}
          </Col>
          <Col xs={3} lg={{ span: 7, order: 1 }}>
            <p className="Xsmall"></p>
          </Col>
          <Col
            xs={6}
            sm={{ span: 6, offset: 1, order: 4 }}
            md={{ span: 2 }}
            lg={{ offset: 0 }}
            xl={{ span: 2, offset: 0 }}
          >
            <p>
              <FaGithub />{' '}
              <a
                href="https://github.com/Makscsk"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'Github Makscsk'}
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
