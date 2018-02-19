require 'rails_helper'

describe Guest do
  describe '#playlists' do
    it 'returns an empty array' do
      guest = Guest.new

      expect(guest.playlists).to eq([])
    end
  end
end
