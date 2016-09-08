require 'yaml'
require 'json'
require 'open-uri/cached'
require 'xml/to/hash'

OpenURI::Cache.cache_path = '_cache'

games = YAML.load_file File.join(__dir__, '..', '_data/games.yml')

bgg_list = games['board_game_geek']
BASE_URL = 'https://www.boardgamegeek.com/xmlapi2/thing?type=boardgame&id='

bgg_list.each do |key, id|

  url = BASE_URL + "#{id}"
  api_url = URI::encode(url)
  puts api_url

  response = open(api_url)
  raise 'Invalid response from nominatim' if response.status[0] != '200'
  xml = Nokogiri::XML response.read

  File.open("_games/#{key}.xml", 'w') {|file| file.write xml.inner_html }
  json = xml.to_hash.to_json

  filename = "_games/#{key}.json"
  File.open(filename, 'w') { |file| file.write(json) }
end
