import { Box, Flex, Spacer, Text, Avatar, Icon } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { fetchApi, baseUrl } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';
import formatText from '../../utils/formatText';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  const RenderDescription = () => {
    const descriptionArray = formatText(description);

    return descriptionArray.map((point) => <Flex key={point}>{point}</Flex>);
  };
  return (
    <Box maxWidth={'1000px'} margin='auto' p='4'>
      {photos && <ImageScrollbar data={photos} />}
      <Box w={'full'} p='6'>
        <Flex
          paddingTop={'2'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Box paddingRight='3' color='green.400'>
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight={'bold'} fontSize={'lg'}>
              NPR {millify(price)} {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size='sm' src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems={'center'}
          padding={'1'}
          justifyContent={'space-between'}
          w='250px'
          color='blue.400'>
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
          <BsGridFill />
        </Flex>
        <Box marginTop={'2'}>
          <Text fontSize={'lg'} marginBottom={'2'} fontWeight={'bold'}>
            {title}
          </Text>
          <Text color={'gray.600'} lineHeight={'2'}>
            {description && <RenderDescription />}
          </Text>
          <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
            <Flex
              justifyContent={'space-between'}
              w='400px'
              borderBottom={'1px'}
              textTransform={'uppercase'}
              borderColor={'gray.100'}
              p='3'>
              <Text>Type</Text>
              <Text fontWeight={'black'}>{type}</Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              w='400px'
              borderBottom={'1px'}
              textTransform={'uppercase'}
              borderColor={'gray.100'}
              p='3'>
              <Text>Purpose</Text>
              <Text fontWeight={'black'}>{purpose}</Text>
            </Flex>
            {furnishingStatus && (
              <Flex
                justifyContent={'space-between'}
                w='400px'
                borderBottom={'1px'}
                textTransform={'uppercase'}
                borderColor={'gray.100'}
                p='3'>
                <Text>Furnished?</Text>
                <Text fontWeight={'black'}>{furnishingStatus}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {amenities?.length && (
              <Text fontSize={'2xl'} fontWeight={'black'} marginTop={'5'}>
                Amenities
              </Text>
            )}
            <Flex flexWrap={'wrap'}>
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <Text
                    fontWeight={'bold'}
                    color={'blue.400'}
                    fontSize={'l'}
                    p={'2'}
                    bg={'gray.200'}
                    m='1'
                    borderRadius={'5'}
                    key={amenity.text}>
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
