require 'json'
package = JSON.parse(File.read("package.json"))
version='v' + package["version"]
Pod::Spec.new do |s|
  s.name           = package["name"].split("/").last
  s.version        = package["version"]
  s.summary        = package['description']
  s.author         = "F-451"
  s.license        = package["license"]
  s.homepage       = package["homepage"]
  s.platform       = :ios, "9.0"
  s.source         = { :git => "https://github.com/gleephDamien/react-native-leanplum.git", :tag => version }
  s.source_files   = 'ios/*.{h,m}'

  s.dependency 'React'
  s.dependency 'Leanplum-iOS-SDK'
end
