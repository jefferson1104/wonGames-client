import Base from 'templates/Base'
import Heading from 'components/Heading'
import ProfileMenu from 'components/ProfileMenu'
import { Container } from 'components/Container'

import * as S from './styles'

export type ProfileTemplateProps = {
  children: React.ReactNode
}

const Profile = ({ children }: ProfileTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My profile
        </Heading>

        <S.Main>
          <ProfileMenu />
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Profile
