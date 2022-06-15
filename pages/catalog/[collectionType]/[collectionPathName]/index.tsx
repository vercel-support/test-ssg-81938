import Script from "next/script";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import validator from "validator"

type TitleHomeProps = {
  isUUIDPath: boolean,
  collection: string | null,
  landingData: string | null,
}

function TitleHome({
  isUUIDPath,
  collection,
  landingData
}: TitleHomeProps): JSX.Element | null {
  return (
    <>
      { typeof window !== 'undefined' && (
        <Script
          id="btv-refersion-handler"
          strategy="afterInteractive"
          src={`//www.refersion.com/tracker/v3/${process.env.NEXT_PUBLIC_REFERSION_PUBLIC_KEY}.js`}
          onLoad={() => {
          }}
          onError={(e) => {
          }}
        />
      )}
      <main className="d-flex flex-column container-fluid px-0">
        <div>
          {"Here we have some imports from /components directory rendering things"}
        </div>
      </main>
      <footer>
        Beautiful Footer
      </footer>
    </>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // some api call for all data in reality
  const allCollectionData = [
    {
      id: '123456',
      seoTitleUrl: 'water',
      movie: null,
    },
    {
      id: '1234567',
      seoTitleUrl: 'juice',
      movie: null,
    },
    {
      id: '12345678',
      seoTitleUrl: 'spirit',
      movie: true,
    },
    {
      id: '28794e61-da28-45e0-b6b7-9df066bc3b4f',
      seoTitleUrl: null,
      movie: true,
    }
  ]
    
  // get all seo urls
  const allNamePaths = allCollectionData.filter(col => col.seoTitleUrl != null).map((col) => {
    const url = col.seoTitleUrl
    const movie = col.movie
    // for typing 
    if (url != null) {
      return {
        params: {
          collectionType: movie === true
            ? 'movies'
            : 'shows',
          collectionPathName: url
        }
      }
    }
    throw Error('SeoTitleUrl should not be null here.')
  })

  // get all ids
  const allIdPaths = allCollectionData.map((col) => {
    const id = col.id
    const movie = col.movie
    if (id != null) {
      return {
        params: {
          collectionType: movie === true
            ? 'movies'
            : 'shows',
          collectionPathName: id
        }
      }
    }
    throw Error('collection data should not be null here.')
  })

  let allPaths: { params: { collectionType: string, collectionPathName: string } }[] = []
  
  // expand all into paths
  if (allIdPaths != null) {
    allPaths = [ ...allIdPaths ]
  }
  if (allNamePaths != null) {
    allPaths = [ ...allNamePaths, ...allPaths ]
  }
  
  return {
    paths: allPaths ?? [],
    fallback: false,
  }
}

export async function getStaticProps({
  params
}: GetStaticPropsContext): Promise<GetStaticPropsResult<TitleHomeProps>> {
  const collectionToken = params?.collectionPathName
  if (collectionToken == null) {
    throw Error('Collection Token is invalid')
  }

  const isUUIDPath = validator.isUUID(collectionToken as string, 4)
  
  let collectionToReturn: string | null = null
  let landingData: string | null | undefined = null

  // treat as collection id
  if (isUUIDPath) {
    collectionToReturn = "" // data from server using uuid 
    landingData = "" // data retrieval from server

  } else { // treat as collection seo url
    
    landingData = "" // data from server using url
    collectionToReturn =  ""// data from server using url
  }

  return {
    props: {
      isUUIDPath,
      collection: collectionToReturn,
      landingData,
    }
  }
}

export default TitleHome
