class Boardgame

  BASE_URL = 'https://www.boardgamegeek.com/xmlapi2/thing?type=boardgame&id='

  def initialize(id)
    url = BASE_URL + "#{id}"
    api_url = URI::encode(url)
    puts api_url

    response = open(api_url)
    raise 'Invalid response from nominatim' if response.status[0] != '200'
    @xml = Nokogiri::XML response.read

  end

  def minplayers

  end

  def xpath_value(path, xml = @xml)
    node_value xml.at_xpath path
  end

  def xpath_value_boolean(path, xml = @xml)
    value = xpath_value path, xml
    if value
      value == '1'
    end
  end

  def xpath_value_date(path, xml = @xml)
    value = xpath_value path, xml
    if value
      Date.strptime value, '%F' rescue nil
    end
  end

  def xpath_value_float(path, xml = @xml)
    value = xpath_value path, xml
    if value
      Float(value) rescue nil
    end
  end

  def xpath_value_int(path, xml = @xml)
    value = xpath_value path, xml
    if value
      Integer(value) rescue nil
    end
  end

  def xpath_value_time(path, xml = @xml)
    value = xpath_value path, xml
    if value
      DateTime.strptime(value, '%a, %d %b %Y %T %z') rescue nil
    end
  end

  def xpath_values(path, xml = @xml)
    nodes = xml.xpath path
    nodes.map do |node|
      node_value node
    end unless nodes.empty?
  end

  def node_value(node)
    if node.instance_of? Nokogiri::XML::Attr
      node.value
    elsif node.instance_of? Nokogiri::XML::Element
      node.text
    end
  end
end
